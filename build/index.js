"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const axios = require('axios');
const app = (0, express_1.default)();
const cors = require('cors');
// If you're here and you like writing routes, feel free to add some of your own! Get creative with what the itunes API can serve back by visiting their documentation:
// https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
app.use(cors());
app.get('/', (req, res) => {
    res.status(200).send('Please use /album/:artistId to search for all albums by artist or /song/:albumId to search for all songs by an album id');
});
app.get('/album/:artistId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // searches for all albums by artist, feed itunes artistId into params
    let response = yield axios.get(`https://itunes.apple.com/lookup?id=${req.params.artistId}&entity=album`);
    res.status(200).send(response.data);
}));
app.get('/song/:albumId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // searches for all songs by album
    let response = yield axios.get(`https://itunes.apple.com/lookup?id=${req.params.albumId}&entity=song`);
    res.status(200).send(response.data);
}));
app.get('*', (req, res) => {
    res.status(404).send('404: Not Found');
});
app.listen(process.env.PORT || 4000, () => console.log(`Listening on ${process.env.PORT || 4000}`));
