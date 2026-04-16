$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
     
    document.getElementById('sound-intro').play();

    checkAndUpdatePetInfoInHtml();
  
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
    $('.tron-button').click(clickedTronButton);

    $('.restart-button').click(function() {
      location.reload(); 
    });
  
})
  
    var pet_info = {name:"Bit", weight: 15, happiness: 20};
    var corruption_level = 0; 
  
    function clickedTreatButton() {
      pet_info.happiness += (corruption_level > 5 ? 5 : 2);
      pet_info.weight += (corruption_level > 5 ? 10 : 3);
      updatePetMessage("Yummers");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += 5;
      pet_info.weight -= 2;
      updatePetMessage("Radical");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 3;
      pet_info.weight -= 5;
      updatePetMessage("THE GRID GAMES");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedNapButton() {
      pet_info.happiness += 1;
      if (corruption_level > 0) {
        corruption_level -= 1;
      }
      if (corruption_level <= 5) {
        $('*').css('color', ''); 
        $('*').css('border-color', '');
        $('button').css('box-shadow', '');
      }
      updatePetMessage("Bio-Digital Jazz, Man");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedTronButton() {
      corruption_level += 1; 
      pet_info.happiness += 10;
      pet_info.weight -= 8;
      
      if (corruption_level > 5) {
        updatePetMessage("CRITICAL ERROR: Grid Corrupted!");
        $('*').css('color', '#ff8800');
        $('*').css('border-color', '#ff8800');
        $('button').css('box-shadow', '0 0 10px #ff8800');
      } else {
        updatePetMessage("Its Tronnin Time!");
      }
      
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

      
      var currentSrc = $('.pet-image').attr('src');

      if (pet_info.happiness > 50) {
        if (currentSrc !== 'images/BitYes.webp') {
            $('.pet-image').attr('src', 'images/BitYes.webp');
            document.getElementById('sound-happy').play();  
        }
      } else if (pet_info.happiness > 0) {
        if (currentSrc !== 'images/Bit.webp') {
            $('.pet-image').attr('src', 'images/Bit.webp');
            document.getElementById('sound-sad').play();  
        }
      }

      // Explosion/Death Logic
      if (pet_info.weight > 130 || pet_info.happiness <= 0 || pet_info.happiness >= 100 || pet_info.weight <= 0) {
        $('.pet-image').unwrap(); 
        $('.pet-image').attr('src', 'images/BitNo.webp');
        document.getElementById('sound-death').play(); 
        
        var blastColor = corruption_level > 5 ? '#ff8800' : '#00ffff';
        $('.pet-image').wrap("<div id='blast' style='background: " + blastColor + "; border: 50px solid white; border-radius: 50%; padding: 20px; display: inline-block;'></div>");
        
        setTimeout(function() {
          $('#blast').remove();
          $('.button-container').empty();
          $('#pet-comment').text("DEREZZED! " + pet_info.name);
          $('.restart-button').show();
        }, 300);
      }
    }
    
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.corruption').text(corruption_level); 
    }

    function updatePetMessage(msg) {
      $('#pet-comment').empty();// here is another one right here
      $('#pet-comment').text(msg);

      if ($('.pet-image').length > 0) {
        var wrapColor = corruption_level > 5 ? '#ff8800' : '#00ffff';
        $('.pet-image').wrap("<div id='border-wrap' style='border: 3px dashed " + wrapColor + "; display: inline-block;'></div>");// this is my method right here
        
        setTimeout(function() {
          if ($('#border-wrap').length > 0) {
            $('.pet-image').unwrap();
          }
        }, 500);
      }
    }