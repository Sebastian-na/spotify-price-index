import { TooltipItem, Chart, TooltipModel } from "chart.js"
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const tooltipLabelCallback = (context: TooltipItem<"scatter">) => {
    const gdp = context.parsed.x
    const price = context.parsed.y
    return [`${formatter.format(price)}`, `${formatter.format(gdp)}`]
}

const tooltipTitleCallback = (tooltipItems: TooltipItem<"scatter">[]) => {
    return tooltipItems.map(item => {
        const country = (item.raw as any).country as string
        const region = item.dataset.label
        return `${country} (${region})`
    })
}


const getOrCreateTooltip = (chart: Chart<"scatter">) => {
    let tooltipEl = chart.canvas.parentNode!.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = '1';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .2s ease';
        const table = document.createElement('table');
        table.style.margin = '0px';
        table.style.borderSpacing = '10px'
        table.style.fontSize = '12px'
        tooltipEl.appendChild(table);
        chart.canvas.parentNode!.appendChild(tooltipEl);
    }

    return tooltipEl;
}

export const externalTooltipHandler = (context: { chart: Chart<"scatter">, tooltip: TooltipModel<"scatter"> }) => {
    const { chart, tooltip } = context
    const tooltipEl = getOrCreateTooltip(chart)
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0'
        return;
    }
    // Set Text
    if (tooltip.body) {
        const titleLines = tooltipTitleCallback(tooltip.dataPoints)
        // insert empty element to align with the body lines
        titleLines.unshift('Random text')
        const bodyLines = tooltip.dataPoints.map(b => tooltipLabelCallback(b))
        // Row description
        bodyLines.unshift(['Price', 'GDP'])

        const tableHead = document.createElement('thead');
        const tableHeaderRow = document.createElement('tr');
        tableHeaderRow.style.borderWidth = '0';
        titleLines.forEach((title, index) => {
            const th = document.createElement('th');
            th.style.borderWidth = '0';
            th.style.fontWeight = 'bold'
            if (index == 0) th.style.visibility = 'hidden'
            const text = document.createTextNode(title);
            th.appendChild(text);
            tableHeaderRow.appendChild(th);
            tableHead.appendChild(tableHeaderRow);
        });

        const tableBody = document.createElement('tbody');

        for (let j = 0; j < bodyLines[0].length; j++) {
            const tableBodyRow = document.createElement('tr');
            for (let i = 0; i < bodyLines.length; i++) {
                const body = bodyLines[i][j]

                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = '0';

                const tableCorrectElement = i === 0 ? 'th' : 'td'
                const td = document.createElement(tableCorrectElement)
                if (i === 0) {
                    td.setAttribute('scope', 'row')
                    td.style.fontWeight = 'bold'
                }
                td.style.borderWidth = '0'
                td.style.textAlign = 'center'

                const text = document.createTextNode(body)
                td.appendChild(text)
                tableBodyRow.appendChild(td)
                tableBody.appendChild(tableBodyRow)
            }
        }
        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot!.firstChild) {
            tableRoot!.firstChild.remove();
        }

        // Add new children
        tableRoot!.appendChild(tableHead);
        tableRoot!.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
}

export const ticksCallback = (tickValue: number | string) => {
    return formatter.format(tickValue as number)
}