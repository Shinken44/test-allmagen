## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Open API

http://84.201.140.60:8080/api#/

Request /tables returns aggregation tables
parameter 'field' can take value 'mm_dma' or 'site_id'

Request /charts returns charts
parameter 'interval' can take value in ms. For example: 86400000 is one day
