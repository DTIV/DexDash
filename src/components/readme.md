Component Overview
-------------------

1. # Logo.js
    - component for DEX logo
    - always visible.

2. # Menu.js
    - component for a menu selection under the navbar.
    - always visible.

3. # Showcase.js
    - component for DEX Health metrics and Sentiment analysis.

    - If your DEX covalent ID is the same as your DEX coingecko ID, Skip this step.

    Else, set replace parameters for the dex variable.

    For instance,

    Covalent ID: sushiswap 

    Coingecko ID: sushi

    ```javascript
    const dex = props.dex.replace('swap', '')
    ```

    - if Coingecko data is disbled in config.json file, Provide content where 'Custom data here' is listed.

4. # DEX.js

    - main trading pair assets component with screener to filter page results.
    - gets asset data and passes to AssetList.js
    - data is stored in localStorage.
    - pagination and result size selection

5. # AssetList.js
    - Takes asset data from DEX.js and maps through data creating Data Cards that link to Asset.js
    - changes results based on chain selection.

6. # Asset.js
    - gets Exchange address balance data provided for pool token and each individual token.

7. # Yield.js
    - get yield farming positions and balances from address.

    - if the Covalent DEX ID does not match the key in stakes, update the required replace code.

    For instance,

    Covalent DEX ID: sushiswap

    Covalent Yield Farming token endpoint: sushi_token

    ```javascript
    const token = dex.replace("swap", "_token")
    ```