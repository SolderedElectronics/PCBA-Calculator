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

const currencySymbol = '$'

const pnpProgNoFileOneSide = 650 // D99
const pnpProgNoFileTwoSide = 950 // D100

const pnpProgWithFileOneSide = 400 // D101
const pnpProgWithFileTwoSide = 750 // D102

const progPerBomPiece = 15 // D103
const feederPlacement = 25 // D104

const pnpComponents = 0.18 // D105
const doubleSidedFee = 3 // D108

const setup = () => {
    document.getElementById('lineProgramming').innerHTML = ''
    document.getElementById('lineProgrammingCrossed').innerHTML = '999 $'
    document.getElementById('lineProgrammingVoid').innerHTML = 'VOIDED FOR THE FIRST ORDER'
    document.getElementById('lineProgrammingColor').innerHTML = '0,00 $'
    document.getElementById('lineSetup').innerHTML = ''
    document.getElementById('lineSetupCrossed').innerHTML = '999 $'
    document.getElementById('lineSetupVoid').innerHTML = 'VOIDED FOR THE FIRST BATCH'
    document.getElementById('lineSetupColor').innerHTML = '0,00 $'
    document.getElementById('costPerPiece').innerHTML = ''
    document.getElementById('totalFirstCost').innerHTML = ''
    document.getElementById('totalFutureCost').innerHTML = ''
    document.getElementById('costPerPiece').value = ''

    check()
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

    if (!check(projectName, noBoards, uniqueComponents, noComponents, pnpFile, bothSides)) return

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

    costPerPiece = (Math.round(costPerPiece * 100) / 100).toFixed(2)
    totalFirstCost = (Math.round(totalFirstCost * 100) / 100).toFixed(2)
    totalFutureCost = (Math.round(totalFutureCost * 100) / 100).toFixed(2)

    if (firstOrder) {
        _lineProgramming.innerHTML = ''
        _lineProgrammingCrossed.innerHTML = lineProgramming + ' ' + currencySymbol
        _lineProgrammingColor.innerHTML = '0.0' + ' ' + currencySymbol
        _lineProgrammingVoid.style.display = 'block'
        _lineProgrammingVoid.innerHTML = 'VOIDED FOR THE FIRST ORDER'
    } else {
        _lineProgramming.innerHTML = lineProgramming + ' ' + currencySymbol
        _lineProgrammingCrossed.innerHTML = ''
        _lineProgrammingColor.innerHTML = ''
        _lineProgrammingVoid.style.display = 'hidden'
        _lineProgrammingVoid.innerHTML = ''
    }

    if (firstBatch) {
        _lineSetup.innerHTML = ''
        _lineSetupCrossed.innerHTML = lineSetup + ' ' + currencySymbol
        _lineSetupColor.innerHTML = '0.0' + ' ' + currencySymbol
        _lineSetupVoid.style.display = 'block'
        _lineSetupVoid.innerHTML = 'VOIDED FOR THE FIRST ORDER'
    } else {
        _lineSetup.innerHTML = lineSetup + ' ' + currencySymbol
        _lineSetupCrossed.innerHTML = ''
        _lineSetupColor.innerHTML = ''
        _lineSetupVoid.style.display = 'hidden'
        _lineSetupVoid.innerHTML = ''
    }

    _costPerPiece.value = costPerPiece + ' ' + currencySymbol

    _totalFirstCost.innerHTML = ''
    _totalFirstCostCrossed.innerHTML = totalFutureCost + ' ' + currencySymbol
    _totalFirstCostColor.innerHTML = totalFirstCost + ' ' + currencySymbol

    _totalFutureCost.value = totalFutureCost + ' ' + currencySymbol
}
