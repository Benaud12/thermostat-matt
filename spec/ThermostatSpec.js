describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('has an initial value of 20', function() {
    expect(thermostat.temperature).toBe(20);
  });

  describe('up button', function() {

    it('will increase the temperature by one', function() {
      thermostat.increaseTemp();
      expect(thermostat.temperature).toBe(21);
    });

  });

  describe('down button', function() {

    it('will decrease the temperature by one', function() {
      thermostat.decreaseTemp();
      expect(thermostat.temperature).toBe(19);
    });

    it('will not decrease temperature below 10 degrees', function() {
      thermostat.temperature = 10;
      expect(thermostat.decreaseTemp).toThrowError('Too chilly in here');
    });
  });

  describe('power saving on mode', function() {

    it('will not allow the temperature to increase above 25 degrees', function() {
      thermostat.temperature = 25;
      expect(function() { thermostat.increaseTemp(); }).toThrowError('Above 25 degrees not available in power saving mode');
    });


    it('will drop to 25 degrees if above allowed temperature when turned on', function() {
      thermostat.powerSavingToggle();
      thermostat.temperature = 27;
      thermostat.powerSavingToggle();
      expect(thermostat.temperature).toEqual(25);
    });
  });

  describe('power saving off mode', function() {

    it('will not allow the temperature to increase above 32 degrees', function() {
      thermostat.isPowerSaving = false;
      thermostat.temperature = 32;
      expect(thermostat.increaseTemp).toThrowError('Above 32 degrees not possible');
    });
  });

  describe('reset button', function() {
    it('returns the temperature to 20 degrees', function() {
      thermostat.temperature = 21;
      thermostat.reset();
      expect(thermostat.temperature).toBe(20);
    });
  });

  describe('display color', function() {
    it('is red if temperature is 25', function() {
      thermostat.temperature = 24;
      thermostat.increaseTemp();
      expect(thermostat.colour).toEqual('red');
    });

    it('is green if temperature is 17', function() {
      thermostat.temperature = 18;
      thermostat.decreaseTemp();
      expect(thermostat.colour).toEqual('green');
    });

    it('is yellow if temperature is 21', function() {
      thermostat.increaseTemp();
      expect(thermostat.colour).toEqual('yellow');
    });
  });
});
