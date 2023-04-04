// Оголошення функції для отримання випадкового значення у заданому діапазоні
function getRandomValue(min, max) {
  const damage = Math.floor(Math.random() * (max - min)) + min;
  return damage;
}

const app = Vue.createApp({
  // Оголошення даних додатку
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  // Оголошення методів додатку
  methods: {
    // Додавання повідомлення в журнал дій
    addLogMessage(author, action, value) {
      this.logMessages.unshift({
        actionBy: author,
        actionType: action,
        actionValue: value,
      });
    },
    // Атака гравця
    playerAttack() {
      this.currentRound++;
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "attack", damage);
      this.monsterAttack();
    },
    // Спеціальна атака гравця
    specialplayerAttack() {
      this.currentRound++;
      const damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "special attack", damage);
      this.specialAttackMonster();
    },
    // Лікування гравця
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(1, 40);
      if (this.playerHealth + healValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.monsterAttack();
    },
    // Атака монстра
    monsterAttack() {
      const damage = getRandomValue(8, 20);
      this.playerHealth -= damage;
      this.addLogMessage("monster", "attack", damage);
    },
    // Спеціальна атака монстра
    specialAttackMonster() {
      const damage = getRandomValue(14, 35);
      this.playerHealth -= damage;
      this.addLogMessage("monster", "special attack", damage);
    },
    // Розпочати нову гру
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    // Здатися
    surrender() {
      this.winner = "monster";
    },
  },
  // Обчислювані властивості додатку
  computed: {
    monsterHealthStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthStyles() {
      return { width: this.playerHealth + "%" };
    },
    isUltAble() {
      return this.currentRound % 3 !== 0;
    },
  },
  // слідкування за здоров'ям для виявлення переможця
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        this.playerHealth = 0;
        this.winner = "draw";
      } else if (value <= 0) {
        this.playerHealth = 0;
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.monsterHealth = 0;
        this.playerHealth = 0;
        this.winner = "draw";
      } else if (value <= 0) {
        this.monsterHealth = 0;
        this.winner = "player";
      }
    },
  },
});
// під'єднання до хтмл коду додатку в'ю
app.mount("#game");
