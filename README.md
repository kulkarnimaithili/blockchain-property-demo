# Property Registry Demo


## Installation

```console
git clone https://github.com/aarongoa/blockchain-property-demo
cd blockchain-property-demo
npm install
```

* Make sure you create your own Service on IBM Bluemix and enter the credentials in `mycreds_bluemix.json` in the root directory.
* You can find a detailed tutorial [here](https://github.com/aarongoa/marbles/blob/master/docs/use_bluemix_hyperledger.md)

### Deploy locally
* Run `npm run gulp` in your console in the root directory of the project
* App will run on [localhost:3000](http://localhost:3000)

### Deploy on Bluemix
* To deploy on IBM Bluemix, follow the instructions [here](https://github.com/aarongoa/marbles/blob/master/docs/host_marbles_bluemix.md)

### Seeding
* After deploying, seed the app with property owners, properties, and mappings between owners and properties.
* To seed, send a `POST` to `<url_where_deployed>/seed`
for example:
```console
POST        localhost:3000/seed
```
* You can modify the seed data in: `config/seedData.json`.
* Seeding will only work if the app environment is set to <b>development</b>

## Note
* The project downloads chaincode from branch `v1.0`
* You can configure the repo from which to download in the `options` object in `app.js`
* This project has been developed on top of [Marbles by IBM](https://github.com/IBM-Blockchain/marbles)


## Contributors
* [Aaron Colaco](http://aaroncolaco.com/)
* [Amol Pednekar](https://github.com/amolpednekar)
* [Rishab Bandekar](https://github.com/haxreo5)
* [Riya Borkar](https://github.com/riyaborkar)
* [Saideep Bhosle](https://github.com/bhosle)
* [Shantanu Kulkarni](https://github.com/shantanu3637)
* [Vivek Kumar](https://github.com/vivek-26)
