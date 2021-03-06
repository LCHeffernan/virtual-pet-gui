const minFitness = 0;
const maxFitness = 10;
const minHunger = 0;
const maxHunger = 10;
const maxAge = 30;
const fitnessBreakPoint = 3;
const hungerBreakPoint = 5;
const ageIncrement = 1;
const hungerIncrement = 5;
const fitnessReduction = 3;
const feedReduction = 3;
const exerciseIncrement = 4;
const petDeadMessage = "Your pet is no longer alive :(";
const hungryAndWalkMessage = "I am hungry AND I need a walk";
const walkMessage = "I need a walk";
const hungryMessage = "I am hungry";
const allHappyMessage = "I feel great!";
const statusCheck = typeof module !== "undefined" && module.exports;

function chooseAvatar(petType) {
  createPet();
  const setAvatarPicture = document.getElementById("petAlive");
  document.getElementById("dinosaurAvatar").style.display = "none";
  document.getElementById("unicornAvatar").style.display = "none";
  document.getElementById("dogAvatar").style.display = "none";
  if (petType === "dog") {
    setAvatarPicture.src = "./images/virtualPet.jpg";
    document.body.style.backgroundColor = "#01EDFA";
  } else if (petType === "dinosaur") {
    setAvatarPicture.src = "./images/dinosaur.jpg";
    document.body.style.backgroundColor = "#DC9AFE";
  } else if (petType === "unicorn") {
    setAvatarPicture.src = "./images/unicornIceLolly.jpg";
    document.body.style.backgroundColor = "#37DBFF";
  }
}

function createPet() {
  let name;
  const pet = new Pet((name = prompt("Name your pet", "name")));
  const petNameMessage = document.getElementById("createPet");
  window.pet = pet;
  window.pet.checkUp();
  petNameMessage.style.visibility = "visible";
  petNameMessage.innerHTML = `Hello, my name is ${pet.name}!`;
  document.getElementById("growUp").innerHTML = `${pet.age}`;
}

function pizzaAnimation() {
  let id = null;
  const elem = document.getElementById("pizzaSlice");
  elem.style.visibility = "visible";
  let posX = -370;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (posX === -100) {
      elem.style.visibility = "hidden";
      clearInterval(id);
    } else {
      posX++;
      elem.style.left = posX + "px";
    }
  }
}

function exerciseAnimation() {
  let id = null;
  const elem = document.getElementById("petAlive");
  let posY = 0;
  let direction = "down";
  let counter = 0;
  clearInterval(id);
  id = setInterval(frame);
  function frame() {
    if (counter === 11) {
      clearInterval(id);
    }
    if (posY === 50) {
      direction = "up";
      counter++;
    }
    if (posY === 0) {
      direction = "down";
      counter++;
    }
    if (direction === "down") {
      posY++;
    } else if (direction === "up") {
      posY--;
    }
    elem.style.top = posY + "px";
  }
}

function Pet(name) {
  this.name = name;
  this.age = 0;
  this.hunger = minHunger;
  this.fitness = maxFitness;
  this.children = [];
}

Pet.prototype = {
  get isAlive() {
    return (
      this.age < maxAge && this.hunger < maxHunger && this.fitness > minFitness
    );
  },
};

Pet.prototype.growUp = function () {
  if (!this.isAlive) {
    throw new Error(petDeadMessage);
  }
  this.age += ageIncrement;
  this.hunger += hungerIncrement;
  this.fitness -= fitnessReduction;
  if (!statusCheck) {
    document.getElementById(
      "petMessage"
    ).innerHTML = `I am now ${this.age} years old.`;
    document.getElementById("growUp").innerHTML = `${this.age}`;
  }
};

Pet.prototype.walk = function () {
  if (!this.isAlive) {
    throw new Error(petDeadMessage);
  }
  if (!statusCheck) {
    const newPetMessage = document.getElementById("petMessage");
    if (this.fitness === maxFitness) {
      newPetMessage.innerHTML = "I don't need exercising.";
    } else {
      exerciseAnimation();
      newPetMessage.innerHTML = `Thank you for exercising me.`;
    }
  }
  this.fitness = Math.min((this.fitness += exerciseIncrement), maxFitness);
};

Pet.prototype.feed = function () {
  if (!this.isAlive) {
    throw new Error(petDeadMessage);
  }
  if (!statusCheck) {
    const newPetMessage = document.getElementById("petMessage");
    if (this.hunger === minHunger) {
      newPetMessage.innerHTML = "I don't need feeding.";
    } else {
      pizzaAnimation();
      newPetMessage.innerHTML = `Thank you for feeding me.`;
    }
  }
  this.hunger = Math.max((this.hunger -= feedReduction), minHunger);
};

Pet.prototype.checkUp = function () {
  if (!statusCheck) {
    const hungerStatusPicture = document.getElementById("hunger");
    const fitnessStatusPicture = document.getElementById("fitness");
    hungerStatusPicture.style.backgroundImage = "none";
    fitnessStatusPicture.style.backgroundImage = "none";
    if (!this.isAlive) {
      document.body.style.backgroundColor = "#B376FF";
      document.getElementById("petAlive").src = "./images/grimReaper.jpg";
      document.getElementById("petMessage").innerHTML =
        "Oh dear, I am no longer alive!";
      throw new Error(petDeadMessage);
    }
    if (this.fitness <= fitnessBreakPoint && this.hunger >= hungerBreakPoint) {
      hungerStatusPicture.style.backgroundImage =
        "url('../images/petBowl.jpg')";
      hungerStatusPicture.style.backgroundSize = "cover";
      fitnessStatusPicture.style.backgroundImage =
        "url('../images/petUnfit.jpg')";
      fitnessStatusPicture.style.backgroundSize = "cover";
    } else if (this.fitness <= fitnessBreakPoint) {
      fitnessStatusPicture.style.backgroundImage =
        "url('../images/petUnfit.jpg')";
      fitnessStatusPicture.style.backgroundSize = "cover";
    } else if (this.hunger >= hungerBreakPoint) {
      hungerStatusPicture.style.backgroundImage =
        "url('../images/petBowl.jpg')";
      hungerStatusPicture.style.backgroundSize = "cover";
    }
  }

  if (!this.isAlive) {
    throw new Error(petDeadMessage);
  }
  if (this.fitness <= fitnessBreakPoint && this.hunger >= hungerBreakPoint) {
    return hungryAndWalkMessage;
  }
  if (this.fitness <= fitnessBreakPoint) {
    return walkMessage;
  }
  if (this.hunger >= hungerBreakPoint) {
    return hungryMessage;
  } else {
    return allHappyMessage;
  }
};

Pet.prototype.haveBaby = function (babyName) {
  const child = new Pet(babyName);
  this.children.push(child);
};

if (statusCheck) {
  module.exports = {
    minFitness,
    maxFitness,
    minHunger,
    maxHunger,
    maxAge,
    fitnessBreakPoint,
    hungerBreakPoint,
    ageIncrement,
    hungerIncrement,
    fitnessReduction,
    feedReduction,
    exerciseIncrement,
    petDeadMessage,
    hungryAndWalkMessage,
    walkMessage,
    hungryMessage,
    allHappyMessage,
    Pet,
  };
};