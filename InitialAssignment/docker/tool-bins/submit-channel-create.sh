#!/bin/bash
peer channel create -c tokenchannel -f /var/hyperledger/config/tokenchannel.tx --outputBlock /var/hyperledger/config/tokenchannel.block -o $ORDERER_ADDRESS
