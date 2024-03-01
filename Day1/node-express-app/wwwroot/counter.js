debugger;
        let h1Display = document.getElementById('h1Display');
        let btnPlus = document.getElementById('btnPlus');
        let btnMinus = document.getElementById('btnMinus');
        let counter = 0;

        h1Display.innerText = counter;
        btnPlus.addEventListener("click", function(){
            counter++;
            h1Display.innerText = counter;
        });

        btnMinus.addEventListener("click", function(){
          if(counter > 0)
               counter--;
            h1Display.innerText = counter;
        });