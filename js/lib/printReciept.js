function onPrintReceipt() {
    // Prepare printable content in a new window
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
        alert(
            "Unable to open print window. Please allow popups for this site."
        );
        return;
    }

    const date = new Date().toLocaleString();
    const storeName = "ShopLight";
    const itemsHtml = cart
        .map((item) => {
            const p = products.find((x) => x.id === item.id);
            if (!p) return "";
            const unitPrice = p.salePrice || p.price;
            return `<tr>
        <td style="padding:6px 8px">${escapeHtml(p.name)}</td>
        <td style="padding:6px 8px;text-align:center">${item.qty}</td>
        <td style="padding:6px 8px;text-align:right">$${formatPrice(
            unitPrice
        )}</td>
        <td style="padding:6px 8px;text-align:right">$${formatPrice(
            unitPrice * item.qty
        )}</td>
      </tr>`;
        })
        .join("");

    const subtotal = cart.reduce((s, i) => {
        const p = products.find((x) => x.id === i.id);
        const unit = p ? p.salePrice || p.price : 0;
        return s + unit * i.qty;
    }, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const html = `
      <html>
        <head>
          <title>Receipt - ${storeName}</title>
          <style>
            body{ font-family: Arial, Helvetica, sans-serif; padding:20px; color:#111 }
            h1{ margin:0 0 8px 0 }
            table{ width:100%; border-collapse:collapse; margin-top:12px }
            td,th{ border-bottom:1px solid #eee }
            .totals{ margin-top:12px; width:100% }
            .right{ text-align:right }
          </style>
        </head>
        <body>
          <h1>${storeName}</h1>
          <div>Receipt — ${date}</div>
          <table>
            <thead>
              <tr><th style="text-align:left">Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Line</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="totals">
            <div style="display:flex;justify-content:space-between"><div>Subtotal</div><div class="right">$${formatPrice(
                subtotal
            )}</div></div>
            <div style="display:flex;justify-content:space-between"><div>Tax (8%)</div><div class="right">$${formatPrice(
                tax
            )}</div></div>
            <div style="display:flex;justify-content:space-between;font-weight:700;margin-top:8px"><div>Total</div><div class="right">$${formatPrice(
                total
            )}</div></div>
          </div>
          <div style="margin-top:18px">Thank you for shopping with us.</div>
          <script>window.onload = function(){ window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
}
