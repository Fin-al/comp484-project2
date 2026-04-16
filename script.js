$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    checkAndUpdatePetInfoInHtml();
  
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
    $('.tron-button').click(clickedTronButton);
  
})
  
    var pet_info = {name:"Bit", weight: 15, happiness: 20};
  
    function clickedTreatButton() {
      pet_info.happiness += 2;
      pet_info.weight += 3;
      updatePetMessage("Tasty snack!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += 5;
      pet_info.weight -= 2;
      updatePetMessage("That was fun!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 3;
      pet_info.weight -= 5;
      updatePetMessage("Good workout!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedNapButton() {
      pet_info.happiness += 1;
      updatePetMessage("Feeling rested.");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedTronButton() {
      pet_info.happiness += 10;
      pet_info.weight -= 8;
      updatePetMessage("Its Tronnin Time!");
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

       
      if (pet_info.happiness > 50) {
       
        $('.pet-image').attr('src', 'images/BitYes.webp'); 
      } else {
         
        $('.pet-image').attr('src', 'images/Bit.webp');
      }

      // Explosion/Death Logic
      if (pet_info.weight > 130 || pet_info.happiness <= 0 || pet_info.happiness >= 100||pet_info.weight <=0) {
        // Change to dead image immediately
        $('.pet-image').attr('src', 'images/BitNo.webp');
        
        $('.pet-image').wrap("<div style='background: #00ffff; border: 50px solid white; border-radius: 50%; padding: 20px;'></div>");
        
        setTimeout(function() {
          $('.pet-image').parent().remove();
          $('.button-container').empty();
          $('#pet-comment').text("DEREZZED! " + pet_info.name);
        }, 300);
      }
    }
    
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }

    function updatePetMessage(msg) {
      $('#pet-comment').empty();// here is another one right here
      $('#pet-comment').text(msg);

      if ($('.pet-image').length > 0) {
        $('.pet-image').wrap("<div style='border: 3px dashed #00ffff; display: inline-block;'></div>");// this is my method right here
        
        setTimeout(function() {
          $('.pet-image').unwrap();
        }, 500);
      }
    }