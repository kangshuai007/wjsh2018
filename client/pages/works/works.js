import {
    $wuxGallery
} from '../../utils/index'

Page({
    data: {
        // urls: [
        //     'https://unsplash.it/200/200',
        //     'https://unsplash.it/300/300',
        //     'https://unsplash.it/400/400',
        //     'https://unsplash.it/600/600',
        //     'https://unsplash.it/800/800',
        //     'https://unsplash.it/900/900',
        //     'https://unsplash.it/1000/1000',
        //     'https://unsplash.it/1200/1200',
        // ],
        // rbsf: [
        //     '/image/rbsf-zp1.jpg',
        //     '/image/rbsf-zp111.jpg',
        //     '/image/rbsf-zp4.jpg',
        // ],
        // ybsf: [
        //     '/image/ybsf-zp2.jpg',
        //     '/image/ybsf-zp22.jpg',
        //     '/image/ybsf-zp3.jpg',
        // ],
        // gh: [
        //     '/image/gh-zp8.jpg',
        //     '/image/gh-zp88.jpg',
        //     '/image/gh-zp888.jpg',
        //     '/image/gh-zp8888.jpg',
        //     '/image/gh-zp88888.jpg',
        // ],
        // ms: [
        //     '/image/ms-ms5.jpg',
        //     '/image/ms-ms6.jpg',
        //     '/image/ms-ms7.jpg',
        //     '/image/ms-zp91.jpg',
        // ],
        ms: [
            'http://www.wujiangjy.com/shouji/image/ms5.jpg',
            'http://www.wujiangjy.com/shouji/image/zp91.jpg',
            'http://www.wujiangjy.com/shouji/image/ms7.jpg',
            'http://www.wujiangjy.com/shouji/image/ms6.jpg',
        ],
        rbsf: [
            'http://www.wujiangjy.com/shouji/image/zp111.jpg',
            'http://www.wujiangjy.com/shouji/image/zp1.jpg',
            'http://www.wujiangjy.com/shouji/image/zp4.jpg',
        ],
        ybsf: [
            'http://www.wujiangjy.com/shouji/image/zp22.jpg',
            'http://www.wujiangjy.com/shouji/image/zp2.jpg',
            'http://www.wujiangjy.com/shouji/image/zp3.jpg',
        ],
        gh: [
            'http://www.wujiangjy.com/shouji/image/zp8.jpg',
            'http://www.wujiangjy.com/shouji/image/zp88.jpg',
            'http://www.wujiangjy.com/shouji/image/zp888.jpg',
            'http://www.wujiangjy.com/shouji/image/zp8888.jpg',
            'http://www.wujiangjy.com/shouji/image/zp88888.jpg',
        ],
    },
    onLoad() {},
    showGallery1(e) {
        const {
            current
        } = e.currentTarget.dataset
        const {
            rbsf
        } = this.data

        $wuxGallery().show({
            current,
            urls: rbsf.map((n) => ({
                image: n,
                remark: '软笔书法'
            })), 
            showDelete: false,
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
        })
    },
    showGallery2(e) {
        const {
            current
        } = e.currentTarget.dataset
        const {
            ybsf
        } = this.data

        $wuxGallery().show({
            current,
            urls: ybsf.map((n) => ({
                image: n,
                remark: '硬笔书法'
            })),
            showDelete: false,
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
        })
    },
    showGallery3(e) {
        const {
            current
        } = e.currentTarget.dataset
        const {
            gh
        } = this.data

        $wuxGallery().show({
            current,
            urls: gh.map((n) => ({
                image: n,
                remark: '国画'
            })),
            showDelete: false,
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
        })
    },
    showGallery4(e) {
        const {
            current
        } = e.currentTarget.dataset
        const {
            ms
        } = this.data

        $wuxGallery().show({
            current,
            urls: ms.map((n) => ({
                image: n,
                remark: '美术'
            })),
            showDelete: false,
            indicatorDots: true,
            indicatorColor: '#fff',
            indicatorActiveColor: '#04BE02',
        })
    },
})