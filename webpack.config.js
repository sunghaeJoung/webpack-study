// 웹팩 설정을 위해서는 기본적으로 webpack과 html-webpack-plugin이 필요하다.
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 3000;

// 웹팩 설정 코드를 작성한다.
// mode : 웹팩 설정이 develope(개발 공부에 초점)모드인지 production(배포에 초점)모드인지 알려줌
// entry : 앱이 있는 위치와 번들링 프로세스가 시작되는 지점. 웹팩4부터는 entry 옵션 생략 가능
// output : 번들링 프로세스가 끝난 뒤 번들링된 파일을 저장할 장소와 이름 지정
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    // 번들링 과정에서 사용할 규칙을 설정한다.
    module: {
        rules: [
            // 첫 번째 룰
            // es6,es7으로 작성된 js파일을 es5로 바꾸기 위한 규칙 적용
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // 두 번째 룰
            // css 규칙 적용
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localsConvention: 'camelCase',
                        }
                    }
                ]
            }
        ]
    },
    // 웹팩 번들과정에 적용할 플러그인을 설정한다.
    // HtmlWebpackPlugin은 html파일이나 favicon을 번들링 과정에 포함
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        })
    ],
    // 개발서버를 정의하는 옵션이다.
    // open : 서버를 실행했을 때, 자동으로 브라우저를 열어줌
    // historyApiFallback : 브라우저에서 url을 변경할 수 있도록 해줌
    devServer: {
        host: 'localhost',
        port: port,
        open: true,
        historyApiFallback: true
    }
};