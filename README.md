## Huobi Futures Postman DEMO

You can import the json to your Postman and use this project.

### Huobi Future

The DEMO now only contains the implementation of these interfaces: query position info(api/v1/contract_position_info),query account info(swap-api/v1/contract_account_info), query kline info(market/history/kline).


### Huobi Swap

The DEMO now only contains the implementation of these interfaces: query position info(swap-api/v1/swap_position_info),query account info(swap-api/v1/swap_account_info), query kline info(swap-ex/market/history/kline).

### Huobi Option

The DEMO now only contains the implementation of these interfaces: query position info(option-api/v1/option_position_info),query account info(option-api/v1/option_account_info), query kline info(option-ex/market/history/kline).


## Quick Start

### Install Postman

https://www.postman.com/downloads/

### Import Projects

In the postman menu,select 

Import -- Import File -- Choose Files -- huobi_future.postman_collection.json

### Set Environment

In the postman menu, Manage Environments:

Add Environment:

add "accessKey": xxx
add "secretKey": yyy

save.

## Signature Example

### Huobi Future

huobi_future/request_with_auth_example.js

### Huobi Swap

huobi_swap/request_with_auth_example.js

### Huobi Option

huobi_option/request_with_auth_example.js

## Happy Testing!




