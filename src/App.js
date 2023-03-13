import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Erc721 from './artifacts/contracts/erc721.sol/StandardERC721.json'

// Update with the contract address logged out to the CLI when it was deployed
const erc721Address = "0xbfB25B471720906ab61Daf43422c91B89719028D"

function App() {
  // store in local state
  const [to, setToValue] = useState()
  const [tokenId, setTokenIdValue] = useState()
  const [mintmemo, setMintMemoValue] = useState()

  const [seturitokenId, setURITokenIdValue] = useState()
  const [uri, setUriValue] = useState()

  const [from, setFromValue] = useState()
  const [toaddr, setToaddrValue] = useState()
  const [tokenIdt, setTokenIdtValue] = useState()

  const [balanceaddress,setBalanceAddressValue] = useState()

  const [tokenIdq, setQueryTokenIdValue] = useState()

  let accounts = [];
  let balance = "";


    // request access to the user's MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }


    async function getAccount() {
     const showAccount = document.getElementById('showAccount');
     const showBalance = document.getElementById('showBalance');
      if (typeof window.ethereum !== 'undefined') {
          accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
          console.log(accounts);
          showAccount.value = accounts[0];

          balance = await window.ethereum.request({
              method: 'eth_getBalance',
              params: [
                  accounts[0],
                  'latest'
              ]
          })
          console.log(balance);
          const balance1 = parseInt(balance, 16) / Math.pow(10, 18)
          showBalance.value = balance1
      }
  }

// call the smart contract
    async function getNftInfo() {
        const showNFTName = document.getElementById('showNFTName');
        const showSymbol = document.getElementById('showSymbol');
        const totalMint = document.getElementById('totalMint');
        const allTokensId = document.getElementById('allTokensId');
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(erc721Address, Erc721.abi, provider)
            try {
                const name = await contract.name()
                showNFTName.value = name
                console.log('name: ', name)
            } catch (err) {
                console.log("Error: ", err)
            }

            try {
                const symbol = await contract.symbol()
                showSymbol.value = symbol
                console.log('symbol: ', symbol)
            } catch (err) {
                console.log("Error: ", err)
            }

            try {
                const totalMints = await contract.totalMinted()
                totalMint.value = totalMints
                console.log('symbol: ', totalMints)
            } catch (err) {
                console.log("Error: ", err)
            }

            try {
                const allTokensIds = await contract.allTokensId()
                allTokensId.value = allTokensIds
                console.log('symbol: ', allTokensIds)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    // call the smart contract, safe Mint NFT
    async function safeMint() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(erc721Address, Erc721.abi, signer)
            const mintmemohex = strToHexCharCode(strToUtf8Bytes(mintmemo));
            console.log(mintmemo)
            console.log(mintmemohex)

            const transaction = await contract.safeMint(to,tokenId,mintmemohex)
            await transaction.wait()
        }
    }

    // call the smart contract, safe Mint NFT
    async function setTokenIdURI() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(erc721Address, Erc721.abi, signer)

            console.log(seturitokenId)
            console.log(uri)

            const transaction = await contract.setTokenURI(seturitokenId,uri)
            await transaction.wait()
        }
    }

    // call the smart contract, transfer NFT
    async function transferNft() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(erc721Address, Erc721.abi, signer)
            const transaction = await contract.transferFrom(from,toaddr,tokenIdt)
            await transaction.wait()
        }
    }

    async function queryNft() {
        const queryBalance = document.getElementById('queryBalance');
        const tokeIds = document.getElementById('tokeIds');

        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(erc721Address, Erc721.abi, provider)
            try {
                const nftbalance = await contract.balanceOf(balanceaddress)
                queryBalance.value = nftbalance
                console.log('name: ', nftbalance)
            } catch (err) {
                console.log("Error: ", err)
            }

            try {
                const tokeIdss = await contract.getMyTokens(balanceaddress)
                tokeIds.value = tokeIdss
                console.log('name: ', tokeIdss)
            } catch (err) {
                console.log("Error: ", err)
            }

        }
    }

    async function queryTokenId() {
        const ownerAddress = document.getElementById('ownerAddress');
        const tokenIdURI = document.getElementById('tokenIdURI');
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(erc721Address, Erc721.abi, provider)
            try {
                const ownerAddr = await contract.ownerOf(tokenIdq)
                ownerAddress.value = ownerAddr
                console.log('name: ', ownerAddr)
            } catch (err) {
                ownerAddress.value = ""
                console.log("Error: ", err)
            }

            try {
                const tokenURI = await contract.tokenURI(tokenIdq)
                tokenIdURI.value = tokenURI
                console.log('name: ', tokenURI)
            } catch (err) {
                ownerAddress.value = ""
                console.log("Error: ", err)
            }

        }
    }

    // string to hex string
    function strToHexCharCode(str){
        var hexCharCode = [];
        var chars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
        for(var i = 0; i < str.length; i++) {
            var bit = (str[i] & 0x0f0) >> 4;
            hexCharCode.push(chars[bit]);
            var bit = str[i] & 0x0f;
            hexCharCode.push(chars[bit]);
        }
        return "0x"+hexCharCode.join("");
    }

    function strToUtf8Bytes(str) {
        const utf8 = [];
        for (let ii = 0; ii < str.length; ii++) {
            let charCode = str.charCodeAt(ii);
            if (charCode < 0x80) utf8.push(charCode);
            else if (charCode < 0x800) {
                utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
            } else if (charCode < 0xd800 || charCode >= 0xe000) {
                utf8.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
            } else {
                ii++;
                charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(ii) & 0x3ff));
                utf8.push(
                    0xf0 | (charCode >> 18),
                    0x80 | ((charCode >> 12) & 0x3f),
                    0x80 | ((charCode >> 6) & 0x3f),
                    0x80 | (charCode & 0x3f),
                );
            }
        }
        //兼容汉字，ASCII码表最大的值为127，大于127的值为特殊字符
        for(let jj=0;jj<utf8.length;jj++){
            var code = utf8[jj];
            if(code>127){
                utf8[jj] = code - 256;
            }
        }
        return utf8;
    }


    return (
      <div className="App">
          <header className="App-header">
              <input className="enableEthereumButton" type="submit" value="连接钱包" onClick={getAccount} />
              <label htmlFor="showAccount">地址: </label>
              <input type="text" id="showAccount" name="address" placeholder="address.." />
              <label htmlFor="showBalance">余额: </label>
              <input type="text" id="showBalance" name="balance" placeholder="balance.." />

              <input className="getNFTButton" type="submit" value="获取NFT信息" onClick={getNftInfo}/>
              <label htmlFor="showNFTName">名称: </label>
              <input type="text" id="showNFTName" name="NFTName" placeholder="NFT Name.."/>
              <label htmlFor="showSymbol">标签: </label>
              <input type="text" id="showSymbol" name="symbol" placeholder="symbol.."/>
              <label htmlFor="totalMint">总铸造量: </label>
              <input type="text" id="totalMint" name="totalmint" placeholder="Total minted.."/>
              <label htmlFor="allTokensId">全部TokenId: </label>
              <input type="text" id="allTokensId" name="alltokensid" placeholder="All tokens Id.."/>

              <input className="mintNFTButton" type="submit" value="铸造NFT" onClick={safeMint} />
              <label htmlFor="mintToAddress">Mint address: </label>
              <input type="text" id="mintToAddress" name="minttoaddr"  onChange={e => setToValue(e.target.value)} placeholder="mint to address.."/>
              <label htmlFor="mintTokenId">Token ID: </label>
              <input type="text" id="mintTokenId" name="minttokenid" onChange={e => setTokenIdValue(e.target.value)} placeholder="mint token id.."/>
              <label htmlFor="mintMemo">Memo: </label>
              <input type="text" id="mintMemo" name="mintmemo" onChange={e => setMintMemoValue(e.target.value)} placeholder="mint memo.."/>


              <input className="setTokenURIButton" type="submit" value="设置TokenId URI" onClick={setTokenIdURI} />
              <label htmlFor="setURITokenId">Token Id: </label>
              <input type="text" id="setURITokenId" name="seturitokenid"  onChange={e => setURITokenIdValue(e.target.value)} placeholder="Token id.."/>
              <label htmlFor="uri">URI: </label>
              <input type="text" id="uri" name="uri" onChange={e => setUriValue(e.target.value)} placeholder="Uri.."/>


              <input className="transferNFTButton" type="submit" value="转移NFT" onClick={transferNft}/>
              <label htmlFor="fromAddress">From Address: </label>
              <input type="text" id="fromAddress" name="fromaddress" onChange={e => setFromValue(e.target.value)} placeholder="transfer from address.."/>
              <label htmlFor="transferToAddress">To address: </label>
              <input type="text" id="transferToAddress" name="transfertoaddr" onChange={e => setToaddrValue(e.target.value)} placeholder="transfer to address.."/>
              <label htmlFor="transferTokenId">Token ID: </label>
              <input type="text" id="transferTokenId" name="transfertokenid" onChange={e => setTokenIdtValue(e.target.value)} placeholder="transfer token id.."/>

              <input className="queryNFTButton" type="submit" value="查询NFT" onClick={queryNft} />
              <label htmlFor="queryAddress">Address: </label>
              <input type="text" id="queryAddress" name="queryaddress" onChange={e => setBalanceAddressValue(e.target.value)}  placeholder="query NFT from address.."/>
              <label htmlFor="queryBalance">Balance: </label>
              <input type="text" id="queryBalance" name="querybalance" placeholder="NFT balance.."/>
              <label htmlFor="tokeIds">TokenIds: </label>
              <input type="text" id="tokeIds" name="tokenids" placeholder="NFT token Ids.."/>


              <input className="queryTokenIdButton" type="submit" value="查询TokenId" onClick={queryTokenId}/>
              <label htmlFor="queryTokenId">Token Id: </label>
              <input type="text" id="queryTokenId" name="querytokenid" onChange={e => setQueryTokenIdValue(e.target.value)} placeholder="query token id.."/>
              <label htmlFor="ownerAddress">Owner address: </label>
              <input type="text" id="ownerAddress" name="owneraddress" placeholder="owner address.."/>
              <label htmlFor="tokeniduri">URI: </label>
              <input type="text" id="tokenIdURI" name="tokeniduri" placeholder="token id uri.."/>

          </header>
      </div>


  );
}

export default App;