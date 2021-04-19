var arr=["red" ,"blue","green","yellow"];
var gamePattern=[];
var  userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(event)
{
    if(!started && val(event.key))
    {
        setTimeout(nextSequence,1000);
        started = true;
    }
});
function val(ch)
{
    if(ch=="a" || ch=="A")
        return true;
    else 
        return false;
}
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=(Math.floor((Math.random()*10)%4));
    var randomChosenColour=arr[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} 

$(".btn").on("click",function()
{
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

function playSound(key)
{
    var obj=new Audio("sounds/"+key+".mp3");
    obj.play();
}
function animatePress(key)
{
    $("#"+key).addClass("pressed");
    
    setTimeout(function()
                {
                    $("#"+key).removeClass("pressed");
                }
    ,100);
}
function checkAnswer()
{
    if(gamePattern[userClickedPattern.length-1] == userClickedPattern[userClickedPattern.length-1])
    {
        if (userClickedPattern.length == gamePattern.length)
        {
            setTimeout(nextSequence, 1000);
        }
    }
    else    
    {
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        } , 500);
        playSound("wrong");
        $("#level-title").text("Press any key to Restart");
        $(document).keypress(function()
        {
            window.location.reload();
        });
    }
}

/* popup */


$(".instruction").click(function()
{
    playSound("instruction");
    $(".instruction").addClass("pressed");
    setTimeout(function(){
        $(".instruction").removeClass("pressed");
    },150);
});

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}