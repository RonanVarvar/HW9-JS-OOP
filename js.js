function Clock(timezone, elem) {
    this.timezone = timezone;
    this.elem = document.getElementById(elem);
    this.fullTime = true;
    this.elem.addEventListener('click', this.toggle.bind(this));
};

Clock.prototype.setTime = function setTime() {
    var UAtoUTC = 3 * 60 * 60 * 1000;

    this.diffTime = +new Date() + this.timezone * 60 * 60 * 1000 - UAtoUTC;
    this.now = new Date();
    this.diffTime = new Date(this.diffTime);
};

Clock.prototype.setTimeformat = function setTimeformat() {
    this.setTime();

    var hours = this.diffTime.getHours();
    var min = this.diffTime.getMinutes();
    var sec = this.diffTime.getSeconds();

    if(hours < 10) hours = '0' + hours;

    if(min < 10) min = '0' + min;

    if(sec < 10) sec = '0' + sec;

    this.full = hours + ":" + min + ":" + sec;
    this.short = hours + ":" + min;
};

Clock.prototype.toggle = function toggle() {
    this.fullTime = !this.fullTime;
};

Clock.prototype.toggleClock = function toggleClock() {
    this.setTimeformat();
    
    if(this.fullTime) {
        this.elem.innerHTML = this.full;
    } else {
        this.elem.innerHTML = this.short;
    }
	
};

Clock.prototype.start = function() {
    this.toggleClock();
    var bind = this;

    this.timer = setInterval(function() {
        bind.toggleClock();
    }, 1000);
};

var showtimeLondon = new Clock('0', 'time1');

showtimeLondon.start();

var showtimeKiev = new Clock('+3', 'time2');

showtimeKiev.start();

var showtimeNewYork = new Clock('-5', 'time3');

showtimeNewYork.start();
