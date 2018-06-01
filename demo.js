//点击开始游戏 动态生成100个小格  100div
//leftclick  没有雷  显示数字（代表以当前小格为中心 周围8个格的雷数）扩散（当前周围8个格没有雷）
//   有雷  游戏结束
//rightClick  标记并且没有数字 取消标记  标记是否正确  标记正确 10个都正确 标记成功
//已经出现数字   无效果

var startBtn=document.getElementById('btn');
var box=document.getElementById('box');
var flagbox=document.getElementById('flagbox');
var alertbox=document.getElementById('alertbox');
var alertImg=document.getElementById('alertImg');
var closeBtn=document.getElementById('close');
var score=document.getElementById('score');
var minesNum;
var mineOver;
var block;
var mineMap=[];
var startGameBool=true;
bindEvent();
function bindEvent()
{
    startBtn.onclick=function()
    {
    	if(startGameBool)
    	{
    		    	box.style.display= 'block';
    	flagbox.style.display= 'block';

    	init();
    	startGameBool=false;
    	}


    	

    }  
    box.oncontextmenu = function ()
    {
    	return false;
    }
    box.onmousedown = function(e)
    {
    	 var event=e.target;
         if(e.which==1)
         {
         	leftClick(event);
         }else if(e.which == 3)
         {
         	rightClick(event);
         }
    }
    closeBtn.onclick = function ()
    {
    	alertbox.style.display='none';
    	flagbox.style.display='none';
    	box.style.display='none';
    	box.innerHTML='';
    	startGameBool=true;
    }
}

function init()
{
	minesNum=10;
	mineOver=10;
	score.innerHTML=mineOver;
	for(var i=0;i<10;i++)
	{
		for(var j=0;j<10;j++)
		{
			var con=document.createElement('div');
			con.classList.add('block');//给每个小格加一个类名
			con.setAttribute('id',i+'-'+j);
			box.appendChild(con);
			mineMap.push({mine:0});
		}
	}
	block=document.getElementsByClassName('block');
     while(minesNum)
     {
     	var mineIndex=Math.floor(Math.random()*100);
           if(mineMap[mineIndex].mine === 0 )
           	 {
           	 	mineMap[mineIndex].mine =1;
                 block[mineIndex].classList.add('isLei'); 
                 minesNum--;
           	 }
	     
       }
}

function leftClick(dom)
{
	if(dom.classList.contains('flag'))
	{
		return;
	}
	var isLei=document.getElementsByClassName('isLei');
	if(dom  && dom.classList.contains('isLei'))
	{
		console.log('gameover');
		for(var i=0;i<isLei.length;i++)
		{
			isLei[i].classList.add('show');
		}
		setTimeout(function(){
			alertbox.style.display='block';
			alertImg.style.backgroundImage='url("images/gameover.jpg")';
		},800);
	}else{
           var n=0;
           var posArr=dom && dom.getAttribute('id').split('-');//以横岗拆分的数组
           var posX = posArr && +posArr[0];//容错
           var posY = posArr && +posArr[1];
           dom && dom.classList.add('num');
             for(var i=posX -1;i<=posX+1;i++)
             {
             	for(var j=posY-1;j<=posY+1;j++)
             	{
             		var arroundbox=document.getElementById(i+'-'+j);
             		if(arroundbox && arroundbox.classList.contains('isLei'))
             		{
             			n++;
             		}
             	}
             }
              dom && (dom.innerHTML = n);
              if( n ==0)
              {
              	  for(var i=posX -1;i<=posX+1;i++)
             {
             	for(var j=posY-1;j<=posY+1;j++)
             	{
             		var nearbox=document.getElementById(i + '-' +j);
             		if(nearbox && nearbox.length!=0)
             		{
             			if(!nearbox.classList.contains('check'))
             			{
             				nearbox.classList.add('check');
             			leftClick(nearbox);
             			}
             			
             		}
             	}
             }
              }



	}
}
function rightClick(dom)
{
    if(dom.classList.contains('num'))
    {
    	return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('isLei') && dom.classList.contains('flag'))
    {
    	mineOver--;
    }
      if(dom.classList.contains('isLei') && !dom.classList.contains('flag'))
    {
    	mineOver++;
    }
    score.innerHTML=mineOver;
    if(mineOver == 0)
    {
    	alertbox.style.display = 'block';
    	alertImg.style.backgroundImage= 'url("images/fighting.png")';
    }
}