// 作用：需要将所有的DOM元素对象以及相关的资源全部加载完毕之后，再来实现的事件的函数
window.onload = function(){

    // 声明一个记录点击的缩略图下标
    var bigimgIndex = 0

    // 路径导航的数据渲染
    navPathDataBind();
    function navPathDataBind(){
            /**思路：
            1.先获取路径导航的页面元素（navPath）
            2.再来获取所需要的数据（data.js -> goodData.path）
            3.由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的含义需要根据数据的数量来进行创建DOM元素
            4.在遍历数据创建DOM元素的最后一条 ，只创建a标签，而不创建i标签
            */   

            //1.获取页面的导航的元素对象
            var navPath = document.querySelector('#wrapper #content .contentMain #navPath')
            // console.log(navPath); //验证拿没拿到这个元素

            // 2.获取数据
            var path = goodData.path;
            // console.log(goodData.path);

            //3.遍历数据
            for(var i = 0;i < path.length;i++){
                if(i == path.length - 1){
                    //只需要创建a而且没有href
                    var aNode = document.createElement("a"); //创建4个a标签
                    aNode.innerText = path[i].title
                    navPath.appendChild(aNode);
                } else {
                //4.创建a标签（创建节点）
                var aNode = document.createElement("a"); //创建4个a标签
                aNode.href = path[i].url //将每个a标签的href改为path中的url
                aNode.innerText = path[i].title

                //5.创建i标签
                var iNode = document.createElement("i");
                iNode.innerText = "/";

                //6.添加节点
                navPath.appendChild(aNode);
                navPath.appendChild(iNode); 
                }
            }
    }

    // 放大镜的移入、移出效果
    bigClassBind();
    function bigClassBind(){
        /**
         * 思路：
         * 1、获取小图框元素对象，并且设置移入的事件（onmouseenter）
         * 2、动态的创建蒙版元素以及大图框和大图片的元素
         * 3、移出时（onmouseleave）需要移除蒙版元素和大图框
         */

        // 1、获取小图框元素
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        // 获取leftTop元素
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')

        // 获取数据
        var imagessrc = goodData.imagessrc

        // 2、设置移入的事件
        smallPic.onmouseenter = function(){
            // console.log(111);  //测试

            // 3、创建蒙版元素
            var maskDiv = document.createElement('div')
            maskDiv.className = "mask"

            // 4、创建大图框元素
            var BigPic = document.createElement('div')
            BigPic.id = "bigPic"

            // 5、创建大图片元素
            var BigImg = document.createElement('img')
            BigImg.src = imagessrc[bigimgIndex].b

            // 6、大图框来追加大图片
            BigPic.appendChild(BigImg);

            // 7、让小图框来追加蒙版元素
            smallPic.appendChild(maskDiv)

            // 8、让leftTop元素追加大图框
            leftTop.appendChild(BigPic)

            // 设置移动事件
            smallPic.onmousemove = function(event){
                // event.clientX：鼠标点距离离浏览器左侧X轴的值
                // getBoundingClientRect().left：小图框元素距离浏览器左侧可视left值
                // offsetWidth：为元素的占位宽度
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = event.clientY- smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                // 判断
                if(left < 0){
                    left = 0
                } else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if(top < 0){
                    top = 0
                } else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }

                // 设置left和top属性
                maskDiv.style.left = left + "px"
                maskDiv.style.top = top + "px"

                // 移动的比例关系 = 蒙版元素移动的距离 / 大图片元素移动的距离
                // 蒙版元素移动的距离 = 小图框宽度 - 蒙版元素的宽度
                // 大图片元素移动的距离 = 大图片宽度 - 大图框元素的宽度
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)
                // console.log(scale);  //得到比例为 0.495

                // 大图片元素移动的距离 = 蒙版元素移动的距离 / 移动的比例关系
                // 因为大图片移动的方向和蒙版移动的方向相反
                BigImg.style.left = -left / scale + "px"
                BigImg.style.top = -top / scale + "px"
            }

            // 设置移出事件
            smallPic.onmouseleave = function(){
                // 让小图框移除蒙版元素
                smallPic.removeChild(maskDiv)

                // 让leftTop元素移除大图框
                leftTop.removeChild(BigPic)
            }
        }
    }

    // 动态渲染放大镜缩略图的数据
    thunbnailData()
    function thunbnailData(){
        /**
         * 思路：
         * 1、先获取piclist元素下的ul
         * 2、再获取data.js下的goodData -> imagessrc
         * 3、遍历数组，根据数据的长度来创建li元素
         * 4、让ul遍历追加li元素
         */

        // 1、获取piclist下的ul
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        // console.log(ul);

        // 2、获取imagessrc数据
        var imagessrc = goodData.imagessrc
        // console.log(imagessrc);

        // 3、遍历数据
        for(var i = 0;i<imagessrc.length;i++){
            // 4、创建li元素
            var newLi = document.createElement('li')

            // 5、创建img元素
            var newImg = document.createElement('img')
            newImg.src = imagessrc[i].s

            // 6、让li来追加img元素
            newLi.appendChild(newImg)

            // 7、让ul追加li元素
            ul.appendChild(newLi)
        }
    }

    // 点击缩略图的效果
    thumbnailClick()
    function thumbnailClick(){
        /**
         * 思路：
         * 1、获取所有的li元素，并且循环发生点击事件
         * 2、点击缩略图需要确定其下标位置来找到对应小图路径和大图路径替换现有src的值
         */

        // 1、获取所有的li元素，并且循环发生点击事件
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')
        // console.log(liNodes);

        // 拿到小图片，对小图片进行动态渲染
        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img')

        var imagessrc = goodData.imagessrc

        // 小图路径需要默认和imagessrc的第一个元素小图的路径是一致的
        smallPic_img.src = imagessrc[0].s

        // 2、循环点击这些li元素
        for(var i = 0;i<liNodes.length;i++){
            // 在点击事件之前，给每一个元素都添加上自定义的下标
            liNodes[i].index = i;  //还可以通过setAttribute('index',i)
            liNodes[i].onclick = function(){
                var idx = this.index  //事件函数的this永远指向的是实际发生事件的目标源对象
                // console.log(idx);
                bigimgIndex = idx

                // 变换小图路径
                smallPic_img.src = imagessrc[idx].s
            }
        }
    }

    // 点击缩略图左右箭头进行移动的效果
    thumbnailLeftRightClick()
    function thumbnailLeftRightClick(){
        /**
         * 思路：
         * 1、先获取左右两段的箭头按钮
         * 2、再获取可视的div以及ul元素和所有的li元素
         * 3、计算（发生起点、步长、总体运动的距离值）
         * 4、然后再发生点击事件
         */

        // 1、先获取左右两端的箭头按钮
        var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
        // console.log(prev);
        var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')
        // console.log(next);

        // 2、再获取可视的div以及ul元素和所有的li元素
        var piclist = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist')
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')
        // console.log(piclist,ul,liNodes); 

        // 3、计算（发生起点、步长、总体运动的距离值）
        // 起点
        var start = 0
        // 运动距离
        var step = (liNodes[0].offsetWidth + 20) * 2
        // 总体的距离 = ul的宽度 - div框的宽度 = （图片的总数 - div中显示的数量） * （li的宽度）
        var endPostion = (liNodes.length -5) * (liNodes[0].offsetWidth + 20);

        // 4、然后再发生点击事件
        prev.onclick = function(){
            start -= step
            if (start < 0) {
                start = 0
            }
            ul.style.left = -start + "px"
        }

        next.onclick = function(){
            start += step
            if (start >= endPostion) {
                start = endPostion
            }
            ul.style.left = -start + "px"
        }
    }

    
}