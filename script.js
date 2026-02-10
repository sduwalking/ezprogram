document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const statusEl = document.getElementById('status');

    let workTime = 25 * 60; // 25分钟，以秒为单位
    let timeLeft = workTime;
    let timerInterval = null;
    let isRunning = false;

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        statusEl.textContent = '专注工作中...';

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                statusEl.textContent = "时间到！休息一下。";
                alert("🍅 番茄时间到！休息5分钟吧。");
                resetTimer();
            }
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        statusEl.textContent = '已暂停';
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = workTime;
        updateDisplay();
        startBtn.disabled = false;
        statusEl.textContent = '准备开始工作！';
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    updateDisplay();
});