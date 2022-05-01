
    const PlayAnimation = (boxRef, arrAnim) => {
        
        //const [arrAnim, setArrAnim] = useState([]);
        const removeStyle = ()=>{
            boxRef.current.classList.forEach(cls=>cls.search('animate')!==-1 && boxRef.current.classList.remove(cls));
            boxRef.current.style.removeProperty('animation-delay');
            boxRef.current.style.removeProperty('-webkit-animation-delay');
            boxRef.current.style.removeProperty('--animate-duration');
            boxRef.current.style.removeProperty('--animate-distance');
    
        }

        removeStyle();
        
        let animIndex = 0;
        let distance = 'translate3d(0, -'+arrAnim[animIndex].distance+'%, 0)';
        if(arrAnim[animIndex].effect.search('Up')!==-1){
            distance = 'translate3d(0, '+arrAnim[animIndex].distance+'%, 0)';
        }else if(arrAnim[animIndex].effect.search('Left')!==-1){
            distance = 'translate3d(-'+arrAnim[animIndex].distance+'%, 0, 0)';
        }else if(arrAnim[animIndex].effect.search('Right')!==-1){
            distance = 'translate3d('+arrAnim[animIndex].distance+'%, 0, 0)';
        }

        setTimeout(()=>{
            boxRef.current.style.setProperty('--animate-duration', arrAnim[animIndex].duration+'ms');
            boxRef.current.style.setProperty('--animate-distance', distance);
            boxRef.current.style.setProperty('animation-delay', arrAnim[animIndex].delay+'ms');
            boxRef.current.style.setProperty('-webkit-animation-delay', arrAnim[animIndex].delay+'ms');
            boxRef.current.classList.add('animate__animated', 'animate__'+arrAnim[animIndex].effect);
        }, 10);
        const animationEnd = () => {
            setTimeout(removeStyle, 400);
            animIndex = 0;
        }
        function handleAnimationEnd(){
            if(boxRef.current===null){ return; };
            boxRef.current.removeEventListener('animationend', handleAnimationEnd);
            
            animIndex++;
            animIndex<arrAnim.length ? PlayAnimation() : animationEnd();
        };

        boxRef.current.addEventListener('animationend', handleAnimationEnd);
    }

    
export default PlayAnimation;
    