'use strict';
global.Test = {
    expect: function () {
        return true;
    },
    assertEquals: function () {
        console.log('works');
    }
};
