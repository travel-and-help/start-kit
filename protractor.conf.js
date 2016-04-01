exports.config = {
    baseUrl: 'https://t7h-ci-kit.herokuapp.com',
    capabilities: {
        'browserName': 'chrome'
    },
    sauceUser: 'stremann',
    sauceKey: 'Z30ZbeCIE0+72c/jFUA3lmzXljVmRIEX+wkE8L9hxHFPDOEktgDxlCwNKwr8fDbYopoJew0KITSTJmDskMlERF4qcF4bCoBK8T6++363g6ryzEEOINrc0CcJgS1fnXrjvSgLfQMN6a4uSUqwONOc2P8IlCKjKQHIfiu013xFhKuVbq+qWULUqumoGfleCdGKg0XmHFHxbhD+8st3GD5JAApIQxKF/f/wdENpONfA7GOxh+LOql/pc/od97WJXjDFV3LIH4c9JVsojs7iXLBMSWMWqRDexO4WMCx5b6Hpgz0VqELw9ULn7f6fNt6ZZ/r2A7+FqBG1dO+0uSkBTNlYCuTAMIpqS3OcZvJ+q5FKdKf5QLZ5JHAYooq+Qn2rEdVJ84HIjhiGZY+FRU/0+MphkNp7yHo1hpuYuuFovUT+Lw8oPTCSzff93C1+BZ+P4jj0xWWQRn0wr4f+KhCw+ptLJAcDHGhmgGg262ojLrEDamiXTBE+UD5SgfloWp946RSa8Qos48dHM+dwSXGii7/DJuRgeBkBX0rOI8EjJCRwojCKq7Viq8VcldXZXReInuEnUI0hNA1Z4vKjmiQETgtH1Nqxcb8/rMLcSkcYDj0A5MT6TP8jlOJAS7AlbAsyMxA9wBJRhrQMtdF7NhKmTtRD5hLnY0qwcBygBM75d19QnRs=',
    specs: ['test/e2e/*.js']
};