// Об'єкт персонажа
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
        const damage = Math.floor(Math.random() * this.attackPower) + 1;
        target.health -= damage;
        if (target.health < 0) target.health = 0;
        target.updateHealth();

        if (target.health === 0) {
            alert(`Ви перемогли ${target.current.name}!`); // Використовуємо target.current.name
            loadNextEnemy(); // Завантажуємо нового суперника
        } else {
            target.attack(this); // Ворога атакує персонаж
        }
    }
};

// Об'єкт ворога
let enemy = {
    enemiesList: [
        {name: 'Charmander', maxHealth: 100, attackPower: 15, sprite: '/assets/Charmander.png'},
        {name: 'Bulbasaur', maxHealth: 120, attackPower: 20, sprite: '/assets/Bulbasaur.png'},
        {name: 'Squirtle', maxHealth: 140, attackPower: 25, sprite: '/assets/Squirtle.png'}
    ],
    currentEnemyIndex: 0,

    get current() {
        return this.enemiesList[this.currentEnemyIndex]; // Завжди повертає поточного ворога
    },

    health: 100,

    updateHealth() {
        const healthDisplay = document.getElementById(`health-enemy`);
        const progressBar = document.getElementById(`progressbar-enemy`);
        healthDisplay.textContent = `${this.health} / ${this.current.maxHealth}`;
        progressBar.style.width = `${(this.health / this.current.maxHealth) * 100}%`;
    },

    attack(target) {
        const damage = Math.floor(Math.random() * this.current.attackPower) + 1;
        target.health -= damage;
        if (target.health < 0) target.health = 0;
        target.updateHealth();

        if (target.health === 0) {
            alert(`Вам не пощастило! Ви програли!`);
            resetGame();
        }
    }
};

// Оновлюємо зображення та інформацію про суперника
function updateEnemyDisplay() {
    const enemySprite = document.querySelector('.enemy .sprite');
    const enemyName = document.getElementById("name-enemy");

    // Оновлюємо зображення та ім'я
    enemySprite.src = enemy.current.sprite;
    enemyName.textContent = enemy.current.name;

    // Оновлюємо здоров'я суперника
    enemy.health = enemy.current.maxHealth;
    enemy.updateHealth();
}

// Завантаження наступного суперника
function loadNextEnemy() {
    enemy.currentEnemyIndex++;

    if (enemy.currentEnemyIndex >= enemy.enemiesList.length) {
        alert("Ви перемогли всіх суперників! Гра завершена!");
        resetGame();
        return;
    }

    updateEnemyDisplay();
}

// Скидання гри
function resetGame() {
    enemy.currentEnemyIndex = 0;
    character.health = character.maxHealth;
    enemy.health = enemy.current.maxHealth;
    character.updateHealth();
    updateEnemyDisplay();
}

// Додавання обробників подій для кнопок
document.getElementById("btn-kick").addEventListener("click", () => character.attack(enemy));
document.getElementById("btn-attack-2").addEventListener("click", () => character.attack(enemy));

// Початкове завантаження стану гри
character.updateHealth();
updateEnemyDisplay();