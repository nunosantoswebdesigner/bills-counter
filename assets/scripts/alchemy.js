/*
 Alchemy Websockets Client Library
 Copyright 2011 Olivine Labs, LLC.
 http://www.olivinelabs.com
 */

/*
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*jslint nomen: true devel: true*/

(function () {
    "use strict";

    function mergeDefaults(o1, o2) {
        var o3 = {},
            p = {};

        for (p in o1) {
            if (o1.hasOwnProperty(p)) {
                o3[p] = o1[p];
            }
        }

        for (p in o2) {
            if (o2.hasOwnProperty(p)) {
                o3[p] = o2[p];
            }
        }

        return o3;
    }

    function Alchemy(options) {
        // thanks, John. http://ejohn.org/blog/simple-class-instantiation/
        if (!this instanceof Alchemy) {
            return new Alchemy(options);
        } else {
            if (!options) {
                options = {};
            }

            this._options = mergeDefaults(this._defaultOptions, options);

            if (!options.SocketType) {
                /* Try to autodetect websocket support if we have Modernizr
                 loaded. If another lib (like web-sockets-js) is loaded that
                 creates a websocket obj where we wouldn't normally have one,
                 we'll assume that it's flash.*/
            }

            if (!window.WebSocket) {
                throw 'UNSUPPORTED: Websockets are not supported in this browser!';
            }

            this.SocketState = Alchemy.prototype.SocketStates.Closed;

            this.Connected = this._options.Connected;
            this.Disconnected = this._options.Disconnected;
            this.MessageReceived = this._options.MessageReceived;
        }
    }

    Alchemy.prototype = {
        _socket: {},
        _options: {},

        SocketStates: {
            Connecting: 0,
            Open: 1,
            Closing: 2,
            Closed: 3
        },

        SocketState: 3,

        SocketTypes: {
            WebSocket: 'websocket',
            FlashSocket: 'flashsocket'
        },

        Start: function () {
            var server = 'ws://' + this._options.Server + ':' + this._options.Port + (this._options.Action ? ('/' + this._options.Action + '/') : '/') + this._options.SocketType,
                ACInstance = this;
            this._socket = new WebSocket(server);
            this._socket.onopen = function () {
                ACInstance._OnOpen();
            };
            this._socket.onmessage = function (data) {
                ACInstance._OnMessage(data);
            };
            this._socket.onclose = function () {
                ACInstance._OnClose();
            };
            this.SocketState = Alchemy.prototype.SocketStates.Connecting;
        },

        Send: function (data, flags, resend, failed) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            this._socket.send(data);

            if (flags) {
                flags.sent = setTimeout(function () {
                    if (flags.retries === 3) {
                        failed();
                        return;
                    }
                    flags.sent = false;
                    flags.retries++;

                    resend();
                }, 5000);
            }
        },

        Stop: function () {
            this._socket.close();
        },

        Connected: function () {
        },
        Disconnected: function () {
        },
        MessageReceived: function (data) {
        },

        _OnOpen: function () {
            this.SocketState = Alchemy.prototype.SocketStates.Open;
            this.Connected();
        },

        _OnMessage: function (event) {
            this.MessageReceived(event);
        },

        _OnClose: function () {
            this.SocketState = Alchemy.prototype.SocketStates.Closed;
            this.Disconnected();
        }
    };

    Alchemy.prototype._defaultOptions = {
        Port: 81,
        Server: '',
        Action: '',
        SocketType: Alchemy.prototype.SocketTypes.WebSocket,

        Connected: function () {
        },
        Disconnected: function () {
        },
        MessageReceived: function (data) {
        }
    };

    window.Alchemy = Alchemy;
    window.mergeDefaults = mergeDefaults;

    if (window.MozWebSocket) {
        window.WebSocket = MozWebSocket;
    }
}(window));
