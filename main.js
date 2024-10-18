const enemies = [
    { name: 'Charmander', maxHealth: 100, sprite: '/assets/Charmander.png' },
    { name: 'Bulbasaur', maxHealth: 120, sprite: '/assets/Bulbasaur.png' },
    { name: 'Squirtle', maxHealth: 140, sprite: '/assets/Squirtle.png' }
];

let currentEnemyIndex = 0; // Index of the current enemy

const healthCharacterDisplay = document.getElementById("health-character");
const healthEnemyDisplay = document.getElementById("health-enemy");
const progressBarCharacter = document.getElementById("progressbar-character");
const progressBarEnemy = document.getElementById("progressbar-enemy");
const attackButton = document.getElementById("btn-kick");
const attackButton2 = document.getElementById("btn-attack-2");
const harmButton = document.getElementById("btn-harm");

// Character Object
const character = {
    health: 100,
    maxHealth: 100,

    updateHealthDisplay() {
        healthCharacterDisplay.textContent = `${this.health} / ${this.maxHealth}`;
        progressBarCharacter.style.width = `${(this.health / this.maxHealth) * 100}%`;
    },

    attackEnemy(damage) {
        enemy.health -= damage;
        if (enemy.health < 0) enemy.health = 0;
        enemy.updateHealthDisplay();

        if (enemy.health === 0) {
            alert(`You defeated ${enemy.name}!`);
            loadNextEnemy(); // Load next enemy after victory
        } else {
            this.attackCharacter();
        }
    },

    attackCharacter() {
        const damageToCharacter = Math.floor(Math.random() * 10) + 1;
        this.health -= damageToCharacter;

        if (this.health < 0) this.health = 0;
        this.updateHealthDisplay();

        if (this.health === 0) {
            alert("You lost! Game over!");
            resetGame(); // Restart the game after losing
        }
    },

    resetHealth() {
        this.health = this.maxHealth;
        this.updateHealthDisplay();
    }
};

// Enemy Object
const enemy = {
    name: '',
    health: 100,
    maxHealth: 100,
    sprite: '',

    updateHealthDisplay() {
        healthEnemyDisplay.textContent = `${this.health} / ${this.maxHealth}`;
        progressBarEnemy.style.width = `${(this.health / this.maxHealth) * 100}%`;
    },

    reset() {
        this.name = enemies[currentEnemyIndex].name;
        this.health = enemies[currentEnemyIndex].maxHealth;
        this.sprite = enemies[currentEnemyIndex].sprite;
        this.updateHealthDisplay();
        const enemySprite = document.querySelector('.enemy .sprite');
        enemySprite.src = this.sprite;
        document.getElementById("name-enemy").textContent = this.name;
    },

    harm(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateHealthDisplay();

        if (this.health === 0) {
            alert(`You defeated ${this.name}!`);
            loadNextEnemy(); // Load next enemy after victory
        }
    }
};

function updateEnemyDisplay() {
    enemy.reset(); // Initialize enemy properties and update display
}

// Load next enemy function
function loadNextEnemy() {
    currentEnemyIndex++;

    if (currentEnemyIndex >= enemies.length) {
        alert("You have defeated all enemies! Game over!");
        resetGame(); // Restart game after defeating all enemies
        return;
    }

    updateEnemyDisplay(); // Update display for the new enemy
}

// Reset the game
function resetGame() {
    currentEnemyIndex = 0;
    character.resetHealth();
    enemy.reset(); // Initialize the enemy
}

// Initial state update
updateEnemyDisplay();
character.updateHealthDisplay();

attackButton.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 30) + 1; // Thunder Jolt damage
    character.attackEnemy(damage); // Character attacks the enemy
});

attackButton2.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 10) + 1; // Quick Attack damage
    character.attackEnemy(damage); // Character attacks the enemy
});

harmButton.addEventListener("click", () => {
    const damage = Math.floor(Math.random() * 20) + 1; // Fire Blast damage
    enemy.harm(damage); // Enemy takes damage only
});