const { Component } = require('@serverless/core');

class NuxtJsComponent extends Component {
    async default(inputs = {}) {
        const name = `${process.env.APP_NAME}-${this.context.resourceId()}`;

        const [
            bucket,
            lambdaEdge,
            cloudFront,
        ] = await Promise.all([
            this.load('@serverless/aws-s3'),
            this.load('@serverless/aws-lambda'),
            this.load('@serverless/aws-cloudfront'),
        ]);

        const bucketOutputs = await bucket({
            accelerated: true,
            name: `${name}-assets-bucket`,
        });

        const bucketUpload = [
            bucket.upload({
                dir: '.nuxt/dist/client',
                keyPrefix: "_nuxt",
            }),
            bucket.upload({
                dir: 'static',
                keyPrefix: "static",
            }),
        ];
        await Promise.all(bucketUpload);

        const lambdaEdgeOutputs = await lambdaEdge({
            name: `${name}-lambda-edge`,
            description: 'Lambda@Edge for Nuxt.js CloudFront distribution',
            handler: 'lambda.handler',
            code: '.serverless_nuxt/',
            role: {
                service: ['lambda.amazonaws.com', 'edgelambda.amazonaws.com'],
                policy: {
                    arn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                },
            },
            memory: 512,
            timeout: 10,
        });
        const lambdaEdgePublishOutputs = await lambdaEdge.publishVersion();

        const cloudFrontOutputs = await cloudFront({
            defaults: {
                ttl: 0,
                allowedHttpMethods: ['HEAD', 'GET'],
                forward: {
                    cookies: 'all',
                    queryString: true,
                },
                'lambda@edge': {
                    'origin-request': `${lambdaEdgeOutputs.arn}:${lambdaEdgePublishOutputs.version}`,
                },
            },
            origins: [{
                url: `http://${bucketOutputs.name}.s3.amazonaws.com`,
                private: true,
                pathPatterns: {
                    '_nuxt/*': {
                        ttl: 86400,
                    },
                    'static/*': {
                        ttl: 86400,
                    },
                },
            }],
        });

        let appUrl = cloudFrontOutputs.url;
        const domain = process.env.AWS_DOMAIN;
        if (domain) {
            const domainComponent = await this.load('@serverless/domain');
            const domainOutputs = await domainComponent({
                privateZone: false,
                domain,
                subdomains: {
                    'www': cloudFrontOutputs,
                },
            });
            appUrl = domainOutputs.domains[0];
        }

        return {
            appUrl,
            bucket: bucketOutputs.name,
        };
    }

    async remove() {
        const [bucket, cloudfront, domain] = await Promise.all([
            this.load('@serverless/aws-s3'),
            this.load('@serverless/aws-cloudfront'),
            this.load('@serverless/domain')
        ]);

        await Promise.all([bucket.remove(), cloudfront.remove(), domain.remove()]);
    }
}

module.exports = NuxtJsComponent;
