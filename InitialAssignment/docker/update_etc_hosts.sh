#!/bin/bash
# Update /etc/hosts
source    ./manage_hosts.sh

HOSTNAME=peer1.simplyfi.com:7051
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME
HOSTNAME=peer1.budget.com:8051
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME
HOSTNAME=orderer.simplyfi.com:7050
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME
HOSTNAME=peer1.hr.com:9051
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME
HOSTNAME=postgresql
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME
HOSTNAME=explorer
removehost $HOSTNAME            &> /dev/null
addhost $HOSTNAME

