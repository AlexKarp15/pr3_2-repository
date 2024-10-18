let character = {
    name: "Pikachu",
    health: 100,
    maxHealth: 100,
    elementName: "character",
    attackPower: 40,

    updateHealth() {
        const healthDisplay = document.getElementById(`health-${this.elementName}`);
        const progressBar = document.getElementById(`progressbar-${this.elementName}`);
        healthDisplay.textContent = `${this.health} / ${this.maxHealth}`;
        progressBar.style.width = `${(this.health / this.maxHealth) * 100}%`;
    },

    attack(target) {
        const damage = this.calculateDamage();
        target.takeDamage(damage); // Використовуємо метод ворога для отримання шкоди
        target.updateHealth(); // Оновлюємо здоров'я ворога

        if (target.isDefeated()) {
            alert(`Ви перемогли ${target.current.name}!`);
            loadNextEnemy();
        } else {
            target.attack(this); // Ворога атакує персонаж
        }
    },

    calculateDamage() {
        return Math.floor(Math.random() * this.attackPower) + 1;
    },

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.updateHealth(); // Оновлюємо здоров'я персонажа
    },

    isDefeated() {
        return this.health === 0;
    }
};

let enemy = {
    enemiesList: [
        { name: 'Charmander', maxHealth: 100, attackPower: 15, sprite: '/assets/Charmander.png' },
        { name: 'Bulbasaur', maxHealth: 120, attackPower: 20, sprite: '/assets/Bulbasaur.png' },
        { name: 'Squirtle', maxHealth: 140, attackPower: 25, sprite: '/assets/Squirtle.png' }
    ],
    currentEnemyIndex: 0,

    get current() {
        return this.enemiesList[this.currentEnemyIndex];
    },

    health: 100,

    updateHealth() {
        const healthDisplay = document.getElementById(`health-enemy`);
        const progressBar = document.getElementById(`progressbar-enemy`);
        healthDisplay.textContent = `${this.health} / ${this.current.maxHealth}`;
        progressBar.style.width = `${(this.health / this.current.maxHealth) * 100}%`;
    },

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    },

    isDefeated() {
        return this.health === 0;
    },

    attack(target) {
        const damage = Math.floor(Math.random() * this.current.attackPower) + 1;
        target.takeDamage(damage); // Використовуємо метод персонажа для отримання шкоди
        target.updateHealth(); // Оновлюємо здоров'я персонажа

        if (target.isDefeated()) {
            alert(`Вам не пощастило! Ви програли!`);
            resetGame();
        }
    }
};

// UI функції
function updateEnemyDisplay() {
    const enemySprite = document.querySelector('.enemy .sprite');
    const enemyName = document.getElementById("name-enemy");

    enemySprite.src = enemy.current.sprite;
    enemyName.textContent = enemy.current.name;

    enemy.health = enemy.current.maxHealth;
    enemy.updateHealth();
}

function loadNextEnemy() {
    enemy.currentEnemyIndex++;

    if (enemy.currentEnemyIndex >= enemy.enemiesList.length) {
        alert("Ви перемогли всіх суперників! Гра завершена!");
        resetGame();
        return;
    }

    updateEnemyDisplay();
}

function resetGame() {
    enemy.currentEnemyIndex = 0;
    character.health = character.maxHealth;
    enemy.health = enemy.current.maxHealth;
    character.updateHealth();
    updateEnemyDisplay();
}

// Обробники подій
document.getElementById("btn-kick").addEventListener("click", () => character.attack(enemy));
document.getElementById("btn-attack-2").addEventListener("click", () => character.attack(enemy));

// Початковий стан гри
character.updateHealth();
updateEnemyDisplay();