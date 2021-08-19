// Empty JS for your own code to be here

// ids: projectName
//                          currency
//      noBoards            lineProgramming[Crossed/Void/Color]
//      uniqueComponents    lineSetup[Crossed/Void/Color]
//      noComponents        costPerPiece
//      pnpFile             totalFirstCost[Color]
//      bothSides           totalFutureCost

const firstOrder = true
const firstBatch = true

const pnpProgNoFileOneSide = 650 // D99
const pnpProgNoFileTwoSide = 950 // D100

const pnpProgWithFileOneSide = 400 // D101
const pnpProgWithFileTwoSide = 750 // D102

const progPerBomPiece = 15 // D103
const feederPlacement = 25 // D104

const pnpComponents = 0.18 // D105
const doubleSidedFee = 3 // D108

const email = 'pcb@e-radionica.com'

const currency = { HRK: 1.0, EUR: 1 / 7.5, USD: 1 / 6.32 }
const currencySymbols = { HRK: 'HRK', EUR: 'EUR', USD: 'USD' }

let multiplier = 1.0
let symbol = '$'

const setup = () => {
    document.getElementById('lineProgramming').innerHTML = ''
    document.getElementById('lineProgrammingCrossed').innerHTML = ''
    document.getElementById('lineProgrammingVoid').innerHTML = ''
    document.getElementById('lineProgrammingVoid').style.display = 'none'
    document.getElementById('lineProgrammingColor').innerHTML = ''
    document.getElementById('lineSetup').innerHTML = ''
    document.getElementById('lineSetupCrossed').innerHTML = ''
    document.getElementById('lineSetupVoid').innerHTML = ''
    document.getElementById('lineSetupVoid').style.display = 'none'
    document.getElementById('lineSetupColor').innerHTML = ''
    document.getElementById('costPerPiece').innerHTML = ''
    document.getElementById('totalFirstCost').innerHTML = ''
    document.getElementById('totalFirstCostColor').innerHTML = ''
    document.getElementById('totalFirstCostCrossed').innerHTML = ''
    document.getElementById('totalFutureCost').value = ''
    document.getElementById('costPerPiece').value = ''
    document.getElementById('pnpFile').value = ''
    document.getElementById('bothSides').value = ''

    symbol = currencySymbols[document.getElementById('currency').value]
    multiplier = currency[document.getElementById('currency').value]

    const projectName = document.getElementById('projectName').value

    // B8: noBoards
    const noBoards = parseInt(document.getElementById('noBoards').value)
    // B9: uniqueComponents
    const uniqueComponents = parseInt(document.getElementById('uniqueComponents').value)
    // B10: noComponents
    const noComponents = parseInt(document.getElementById('noComponents').value)
    // B11: pnpFile
    const pnpFile = document.getElementById('pnpFile').value
    // B12: bothSides
    const bothSides = document.getElementById('bothSides').value

    check(projectName, noBoards, uniqueComponents, noComponents, pnpFile, bothSides)
}

window.onload = setup

const check = (projectName, noBoards, uniqueComponents, noComponents, pnpFile, bothSides) => {
    let f = 0
    if (projectName == '') {
        document.getElementById('projectName').style.borderColor = 'red'
        f = 1
    } else document.getElementById('projectName').style.borderColor = ''
    if (isNaN(noBoards)) {
        document.getElementById('noBoards').style.borderColor = 'red'
        f = 1
    } else document.getElementById('noBoards').style.borderColor = ''
    if (isNaN(uniqueComponents)) {
        document.getElementById('uniqueComponents').style.borderColor = 'red'
        f = 1
    } else document.getElementById('uniqueComponents').style.borderColor = ''
    if (isNaN(noComponents)) {
        document.getElementById('noComponents').style.borderColor = 'red'
        f = 1
    } else document.getElementById('noComponents').style.borderColor = ''
    if (!(pnpFile == '0' || pnpFile == '1')) {
        document.getElementById('pnpFile').style.borderColor = 'red'
        f = 1
    } else document.getElementById('pnpFile').style.borderColor = ''
    if (!(bothSides == '0' || bothSides == '1')) {
        document.getElementById('bothSides').style.borderColor = 'red'
        f = 1
    } else document.getElementById('bothSides').style.borderColor = ''
    return !f
}

const update = () => {
    // ======= INPUTS =======

    const projectName = document.getElementById('projectName').value

    // B8: noBoards
    const noBoards = parseInt(document.getElementById('noBoards').value)
    // B9: uniqueComponents
    const uniqueComponents = parseInt(document.getElementById('uniqueComponents').value)
    // B10: noComponents
    const noComponents = parseInt(document.getElementById('noComponents').value)
    // B11: pnpFile
    const pnpFile = document.getElementById('pnpFile').value
    // B12: bothSides
    const bothSides = document.getElementById('bothSides').value

    // ======= OUTPUTS =======

    const _lineProgramming = document.getElementById('lineProgramming')
    const _lineProgrammingCrossed = document.getElementById('lineProgrammingCrossed')
    const _lineProgrammingVoid = document.getElementById('lineProgrammingVoid')
    const _lineProgrammingColor = document.getElementById('lineProgrammingColor')

    const _lineSetup = document.getElementById('lineSetup')
    const _lineSetupCrossed = document.getElementById('lineSetupCrossed')
    const _lineSetupVoid = document.getElementById('lineSetupVoid')
    const _lineSetupColor = document.getElementById('lineSetupColor')

    const _costPerPiece = document.getElementById('costPerPiece')

    const _totalFirstCost = document.getElementById('totalFirstCost')
    const _totalFirstCostCrossed = document.getElementById('totalFirstCostCrossed')
    const _totalFirstCostColor = document.getElementById('totalFirstCostColor')

    const _totalFutureCost = document.getElementById('totalFutureCost')

    // ======= CURRENCY =======

    symbol = currencySymbols[document.getElementById('currency').value]
    multiplier = currency[document.getElementById('currency').value]

    if (!check(projectName, noBoards, uniqueComponents, noComponents, pnpFile, bothSides)) return

    // ======= CALCULATOR =======

    let lineProgramming = 0.0
    if (pnpFile == '1') {
        if (bothSides == '1') {
            lineProgramming = pnpProgWithFileTwoSide
        } else {
            lineProgramming = pnpProgWithFileOneSide
        }
    } else {
        if (bothSides == '1') {
            lineProgramming = pnpProgNoFileTwoSide
        } else {
            lineProgramming = pnpProgNoFileOneSide
        }
    }
    lineProgramming += uniqueComponents * progPerBomPiece

    let lineSetup = feederPlacement * uniqueComponents

    let costPerPiece = noComponents * pnpComponents
    if (bothSides == '1') {
        costPerPiece += doubleSidedFee
    }

    let totalFirstCost = lineProgramming + lineSetup + costPerPiece * noBoards

    let totalFutureCost = lineSetup + costPerPiece * noBoards

    // ======= DISPLAY =======

    const discount = (a) => {
        if (a > 100000) return a * 0.8
        if (a > 40000) return a * 0.85
        if (a > 13000) return a * 0.9
        if (a > 5000) return a * 0.95
        return a
    }

    lineProgramming = discount(lineProgramming)
    lineSetup = discount(lineSetup)
    costPerPiece = discount(costPerPiece)
    totalFirstCost = discount(totalFirstCost)
    totalFutureCost = discount(totalFutureCost)

    const convert = (a) => (Math.round(a * multiplier * 100) / 100).toFixed(2)

    lineProgramming = convert(lineProgramming)
    lineSetup = convert(lineSetup)
    costPerPiece = convert(costPerPiece)
    totalFirstCost = convert(totalFirstCost)
    totalFutureCost = convert(totalFutureCost)

    if (firstOrder) {
        _lineProgramming.innerHTML = ''
        _lineProgrammingCrossed.innerHTML = lineProgramming + ' ' + symbol
        _lineProgrammingColor.innerHTML = '0.00' + ' ' + symbol
        _lineProgrammingVoid.style.display = 'block'
        _lineProgrammingVoid.innerHTML = 'VOIDED FOR THE FIRST ORDER'
    } else {
        _lineProgramming.innerHTML = lineProgramming + ' ' + symbol
        _lineProgrammingCrossed.innerHTML = ''
        _lineProgrammingColor.innerHTML = ''
        _lineProgrammingVoid.style.display = 'hidden'
        _lineProgrammingVoid.innerHTML = ''
    }

    if (firstBatch) {
        _lineSetup.innerHTML = ''
        _lineSetupCrossed.innerHTML = lineSetup + ' ' + symbol
        _lineSetupColor.innerHTML = '0.00' + ' ' + symbol
        _lineSetupVoid.style.display = 'block'
        _lineSetupVoid.innerHTML = 'VOIDED FOR THE FIRST ORDER'
    } else {
        _lineSetup.innerHTML = lineSetup + ' ' + symbol
        _lineSetupCrossed.innerHTML = ''
        _lineSetupColor.innerHTML = ''
        _lineSetupVoid.style.display = 'hidden'
        _lineSetupVoid.innerHTML = ''
    }

    _costPerPiece.value = costPerPiece + ' ' + symbol

    _totalFirstCost.innerHTML = ''
    _totalFirstCostCrossed.innerHTML = totalFirstCost + ' ' + symbol
    _totalFirstCostColor.innerHTML = totalFutureCost + ' ' + symbol

    _totalFutureCost.value = totalFutureCost + ' ' + symbol
}

const sendEmail = () => {
    const projectName = document.getElementById('projectName').value

    // B8: noBoards
    const noBoards = parseInt(document.getElementById('noBoards').value)
    // B9: uniqueComponents
    const uniqueComponents = parseInt(document.getElementById('uniqueComponents').value)
    // B10: noComponents
    const noComponents = parseInt(document.getElementById('noComponents').value)
    // B11: pnpFile
    const pnpFile = document.getElementById('pnpFile').value
    // B12: bothSides
    const bothSides = document.getElementById('bothSides').value

    if (!check(projectName, noBoards, uniqueComponents, noComponents, pnpFile, bothSides)) return

    // ======= CALCULATOR =======

    let lineProgramming = 0.0
    if (pnpFile == '1') {
        if (bothSides == '1') {
            lineProgramming = pnpProgWithFileTwoSide
        } else {
            lineProgramming = pnpProgWithFileOneSide
        }
    } else {
        if (bothSides == '1') {
            lineProgramming = pnpProgNoFileTwoSide
        } else {
            lineProgramming = pnpProgNoFileOneSide
        }
    }
    lineProgramming += uniqueComponents * progPerBomPiece

    let lineSetup = feederPlacement * uniqueComponents

    let costPerPiece = noComponents * pnpComponents
    if (bothSides == '1') {
        costPerPiece += doubleSidedFee
    }

    let totalFirstCost = lineProgramming + lineSetup + costPerPiece * noBoards

    let totalFutureCost = lineSetup + costPerPiece * noBoards

    // ======= DISPLAY =======

    const discount = (a) => {
        if (a > 100000) return a * 0.8
        if (a > 40000) return a * 0.85
        if (a > 13000) return a * 0.9
        if (a > 5000) return a * 0.95
        return a
    }

    lineProgramming = discount(lineProgramming)
    lineSetup = discount(lineSetup)
    costPerPiece = discount(costPerPiece)
    totalFirstCost = discount(totalFirstCost)
    totalFutureCost = discount(totalFutureCost)

    const convert = (a) => (Math.round(a * 100) / 100).toFixed(2)

    lineProgramming = convert(lineProgramming)
    lineSetup = convert(lineSetup)
    costPerPiece = convert(costPerPiece)
    totalFirstCost = convert(totalFirstCost)
    totalFutureCost = convert(totalFutureCost)

    window.open(
        encodeURI(
            'mailto:' +
                email +
                '?subject=PCBA Estimate&body=' + //
                `Hello,\n\nthank you for your request to receive a PCBA quote. Your PCB details are as following:\n\n` +
                `Project name: ${projectName}\n` +
                `Number of boards: ${noBoards}\n` +
                `Unique components: ${uniqueComponents}\n` +
                `Total number of components: ${noComponents}\n` +
                `PNP or CAD file present: ${pnpFile == '1' ? 'true' : 'false'}\n` +
                `Both sided: ${bothSides == '1' ? 'true' : 'false'}\n\n` +
                `Estimates:\n` +
                `Line programming: ${lineProgramming} HRK${firstOrder ? ' - discounted to 0.00 HRK' : ''}\n` +
                `Line setup:  ${lineSetup} HRK\n` +
                `Assembly cost per piece:  ${costPerPiece} HRK${firstBatch ? ' - discounted to 0.00 HRK' : ''}\n` +
                `Total cost for the first batch:  ${totalFirstCost} HRK - discounted to ${totalFutureCost} HRK\n` +
                `Total cost for future batches:  ${totalFutureCost} HRK\n\n` +
                `We will provide you with a quote as soon as possible.\n\nBest regards,\nTAVU team\n`
        )
    )
}
