
const BLOOD_REQUEST_CONSTANTS = {
    status: {
        submitted: 'submitted',
        draft: 'draft',
        executed: 'executed',
        reopened: 'reopened',
        routedToCities: 'routedToCities',
    },
    source: {
        donor: 'donors',
        bloodBank: 'bloodBank',
        both: 'both'
    },
    bloodGroup: {
        A: 'A',
        Aminus: 'A-',
        Aplus: 'A+',
        B: 'B',
        Bplus: 'Bplus',
        Bminus: 'B-',
        O: 'O',
        Oplus: 'Oplus',
        Ominus: 'O-',
        AB: 'AB',
        ABplus: 'ABplus',
        ABminus: 'AB-',
        unknown: 'unknown'
    },
    bloodType: {
        normal: 'normal',
        filtered: 'filtered',
        mshee3: 'mshee3',
        mshee3AndFiltered: 'mshee3AndFiltered',
        kraimo: 'kraimo',
        kraimoAndPlasma: 'kraimoAndPlasma',
        containers: 'containers'
    }

}

module.exports = BLOOD_REQUEST_CONSTANTS