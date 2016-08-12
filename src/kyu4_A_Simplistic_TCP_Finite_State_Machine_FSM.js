'use strict';
let Solution = {
    d: `
    Automatons,
    or Finite State Machines(FSM),
    are extremely useful to programmers when it comes to software design.
    You will be given a simplistic version of an FSM to code
    for a basic TCP session.

    The outcome of this exercise will be to
    return the correct state of the TCP FSM based on the array of events given.

    The input array of events will consist of 
    one or more of the following strings:

        APP_PASSIVE_OPEN,
        APP_ACTIVE_OPEN,
        APP_SEND,
        APP_CLOSE,
        APP_TIMEOUT,
        RCV_SYN,
        RCV_ACK,
        RCV_SYN_ACK,
        RCV_FIN,
        RCV_FIN_ACK

    The states(there are 11) are as follows and should be 
    returned in all capital letters as shown:

        CLOSED,
        LISTEN,
        SYN_SENT,
        SYN_RCVD,
        ESTABLISHED,
        CLOSE_WAIT,
        LAST_ACK,
        FIN_WAIT_1,
        FIN_WAIT_2,
        CLOSING,
        TIME_WAIT

    The input will be an array of events.
    Your job is to traverse the FSM as determined by the events,
    and return the proper state as a string,
    all caps, as shown above.

    If an event is not applicable or nonsensical to the current state,
    your code will return "ERROR".

    Action of each event upon each state:

        Format is INITIAL_STATE: EVENT - > NEW_STATE
        
        CLOSED: APP_PASSIVE_OPEN - > LISTEN
        CLOSED: APP_ACTIVE_OPEN - > SYN_SENT
        LISTEN: RCV_SYN - > SYN_RCVD
        LISTEN: APP_SEND - > SYN_SENT
        LISTEN: APP_CLOSE - > CLOSED
        SYN_RCVD: APP_CLOSE - > FIN_WAIT_1
        SYN_RCVD: RCV_ACK - > ESTABLISHED
        SYN_SENT: RCV_SYN - > SYN_RCVD
        SYN_SENT: RCV_SYN_ACK - > ESTABLISHED
        SYN_SENT: APP_CLOSE - > CLOSED
        ESTABLISHED: APP_CLOSE - > FIN_WAIT_1
        ESTABLISHED: RCV_FIN - > CLOSE_WAIT
        FIN_WAIT_1: RCV_FIN - > CLOSING
        FIN_WAIT_1: RCV_FIN_ACK - > TIME_WAIT
        FIN_WAIT_1: RCV_ACK - > FIN_WAIT_2
        CLOSING: RCV_ACK - > TIME_WAIT
        FIN_WAIT_2: RCV_FIN - > TIME_WAIT
        TIME_WAIT: APP_TIMEOUT - > CLOSED
        CLOSE_WAIT: APP_CLOSE - > LAST_ACK
        LAST_ACK: RCV_ACK - > CLOSED

    Example Inputs

        ["APP_PASSIVE_OPEN", "APP_SEND", "RCV_SYN_ACK"] => "ESTABLISHED".
        ["APP_ACTIVE_OPEN"] => "SYN_SENT".
        ["APP_ACTIVE_OPEN", "RCV_SYN_ACK", "APP_CLOSE", "RCV_FIN_ACK", "RCV_ACK"] => "ERROR".

    This kata is similar to another titled 
    "Design a Simple Automaton (Finite State Machine),"
    and you may wish to try that kata before tackling this one.

    See wikipedia page
    http://en.wikipedia.org/wiki/Transmission_Control_Protocol
    for further details.

    See 
    http://www.medianet.kent.edu/techreports/TR2005-07-22-tcp-EFSM.pdf page 4, 
    for the FSM diagram used for this kata.
    `
};
Solution.traverseTCPStates_01 = {
    d: `switch`,
    f: function (eventList) {

        let state = 'CLOSED';

        for (let i in eventList) {
            switch (eventList[i]) {
            case 'APP_PASSIVE_OPEN':
                if (state == 'CLOSED')
                    state = 'LISTEN';
                else
                    return 'ERROR';
                break;
            case 'APP_ACTIVE_OPEN':
                if (state == 'CLOSED')
                    state = 'SYN_SENT';
                else
                    return 'ERROR';
                break;
            case 'APP_SEND':
                if (state == 'LISTEN')
                    state = 'SYN_SENT';
                else
                    return 'ERROR';
                break;
            case 'APP_CLOSE':
                if (state == 'LISTEN')
                    state = 'CLOSED';
                else if (state == 'SYN_RCVD')
                    state = 'FIN_WAIT_1';
                else if (state == 'SYN_SENT')
                    state = 'CLOSED';
                else if (state == 'ESTABLISHED')
                    state = 'FIN_WAIT_1';
                else if (state == 'CLOSE_WAIT')
                    state = 'LAST_ACK';
                else
                    return 'ERROR';
                break;
            case 'APP_TIMEOUT':
                if (state == 'TIME_WAIT')
                    state = 'CLOSED';
                else
                    return 'ERROR';
                break;
            case 'RCV_SYN':
                if (state == 'LISTEN')
                    state = 'SYN_RCVD';
                else if (state == 'SYN_SENT')
                    state = 'SYN_RCVD';
                else
                    return 'ERROR';
                break;
            case 'RCV_ACK':
                if (state == 'SYN_RCVD')
                    state = 'ESTABLISHED';
                else if (state == 'FIN_WAIT_1')
                    state = 'FIN_WAIT_2';
                else if (state == 'CLOSING')
                    state = 'TIME_WAIT';
                else if (state == 'LAST_ACK')
                    state = 'CLOSED';
                else
                    return 'ERROR';
                break;
            case 'RCV_SYN_ACK':
                if (state == 'SYN_SENT')
                    state = 'ESTABLISHED';
                else
                    return 'ERROR';
                break;
            case 'RCV_FIN':
                if (state == 'ESTABLISHED')
                    state = 'CLOSE_WAIT';
                else if (state == 'FIN_WAIT_1')
                    state = 'CLOSING';
                else if (state == 'FIN_WAIT_2')
                    state = 'TIME_WAIT';
                else
                    return 'ERROR';
                break;
            case 'RCV_FIN_ACK':
                if (state == 'FIN_WAIT_1')
                    state = 'TIME_WAIT';
                else
                    return 'ERROR';
                break;
            default:
                return 'ERROR';
            }
        }

        return state;
    }
};
Solution.traverseTCPStates_02 = {
    d: `hashtab`,
    f: function (eventList) {

        let states = {
            CLOSED: {
                APP_PASSIVE_OPEN: "LISTEN",
                APP_ACTIVE_OPEN: "SYN_SENT"
            },
            LISTEN: {
                RCV_SYN: "SYN_RCVD",
                APP_SEND: "SYN_SENT",
                APP_CLOSE: "CLOSED"
            },
            SYN_RCVD: {
                APP_CLOSE: "FIN_WAIT_1",
                RCV_ACK: "ESTABLISHED"
            },
            SYN_SENT: {
                RCV_SYN: "SYN_RCVD",
                RCV_SYN_ACK: "ESTABLISHED",
                APP_CLOSE: "CLOSED"
            },
            ESTABLISHED: {
                APP_CLOSE: "FIN_WAIT_1",
                RCV_FIN: "CLOSE_WAIT"
            },
            FIN_WAIT_1: {
                RCV_FIN: "CLOSING",
                RCV_FIN_ACK: "TIME_WAIT",
                RCV_ACK: "FIN_WAIT_2"
            },
            CLOSING: {
                RCV_ACK: "TIME_WAIT"
            },
            FIN_WAIT_2: {
                RCV_FIN: "TIME_WAIT"
            },
            TIME_WAIT: {
                APP_TIMEOUT: "CLOSED"
            },
            CLOSE_WAIT: {
                APP_CLOSE: "LAST_ACK"
            },
            LAST_ACK: {
                RCV_ACK: "CLOSED"
            },
            ERROR: {}
        };

        return eventList.reduce((state, event) => states[state][event] || 'ERROR', 'CLOSED');
    }
};
Solution.traverseTCPStates_03 = {
    d: `I simply stringified states map JSON and compressed it with kinda LZW algorythm`,
    f: function (eventList) {

        let changes = JSON.parse(
            "utsrqponmlkjihgfedcbaZXQJ".split("").reduce(
                function (p, a, i) {
                    return p.replace(
                        new RegExp(a, "g"),
                        "je%ad%phie%J1%\"Q_WAIT%aSYN%\"CLOSING%IVE_OPENh%\"LAST_ACK%cQh%aFIN%\"QD%ZRCVD%\":%ZSENT%\"LISTEN%\",%ACK\":%APP_%\"TIME_WAIT%RCV_%\"SYN_%\"ESTABLISHED%CLOSE%\"FIN_WAIT_".split("%")[i]
                    );
                },
                "{gsfsgp_dXeitXeXlreilrertJ2eJ2khberk_dbeotbeXkhqeqlmemtubcTIMEOUThugluflurkhoejcPASSnfefcSE\NDhgejcACTng\"}"
            )
        );

        return eventList.reduce(function (r, a) {
            return changes[r + a] || 'ERROR';
        }, 'CLOSED');

    }
};

// --------------------------------------------------------------
import {
    arrayManip,
    stringManip,
    randBoolean,
    randNumber,
    randChoice,
    randString,
    randStringBy,
    range,
}
from './common';

function genSets(subSol) {
    let testSets = [];
    for (let i = 0; i < 100; i++) {
        let x = randNumber(0, 100);
        let match = subSol.f(x);
        testSets.push([
            [x, ],
            match
        ]);
    }
    return testSets;
}

// --------------------------------------------------------------
import {
    TestFixture
}
from './testFixture';
let testFixture = TestFixture(Solution, genSets);
testFixture.prep();
testFixture.test(false);
testFixture.testSpd(100);