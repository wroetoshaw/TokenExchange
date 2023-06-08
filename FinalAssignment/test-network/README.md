## Running the test network

You can use the `./network.sh` script to stand up a simple Fabric test network. The test network has two peer organizations with one peer each and a single node raft ordering service. You can also use the `./network.sh` script to create channels and deploy chaincode. For more information, see [Using the Fabric test network](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html). The test network is being introduced in Fabric v2.0 as the long term replacement for the `first-network` sample.

Before you can deploy the test network, you need to follow the instructions to [Install the Samples, Binaries and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Hyperledger Fabric documentation.

export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.simplyfi.com/users/Admin@org2.simplyfi.com/msp
export CORE_PEER_ADDRESS=localhost:9051

basic_1.0:81e19c7c83f1714e5347d24cf31983fab9396b81400e3924994bc4156c74d88b

export CORE_PEER_LOCALMSPID="Org3MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org3.simplyfi.com/peers/peer0.org3.simplyfi.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org3.simplyfi.com/users/Admin@org3.simplyfi.com/msp
export CORE_PEER_ADDRESS=localhost:11051

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem"

export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/users/Admin@org1.simplyfi.com/msp
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt
export CORE_PEER_ADDRESS=localhost:7051

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem"

peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" --output json


peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.simplyfi.com/peers/peer0.org3.simplyfi.com/tls/ca.crt"


peer lifecycle chaincode querycommitted --channelID mychannel --name basic --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem"

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.simplyfi.com/peers/peer0.org3.simplyfi.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'


peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.simplyfi.com --tls --cafile "${PWD}/organizations/ordererOrganizations/simplyfi.com/orderers/orderer.simplyfi.com/msp/tlscacerts/tlsca.simplyfi.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.simplyfi.com/peers/peer0.org1.simplyfi.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.simplyfi.com/peers/peer0.org2.simplyfi.com/tls/ca.crt" --peerAddresses localhost:11051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org3.simplyfi.com/peers/peer0.org3.simplyfi.com/tls/ca.crt" -c '{"function":"UpdateToken","Args":["token1","karthik","1000000"]}'

