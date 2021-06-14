import { EnrollmentRepository } from "./EnrollmentRepository";
import InvoiceRepository from "./InvoiceRepository";

export default class PayInvoice {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {}

  execute(payRequest: any): void {
    const enrollment = this.enrollmentRepository.findByEnrollmentCode(
      payRequest.code
    );
    if (!enrollment) throw new Error("Enrollment not found.");
    const invoice = enrollment.invoices.find(
      (invoice) =>
        invoice.month === payRequest.month && invoice.year === payRequest.year
    );
    if (!invoice) throw new Error("Invoice not found");
    invoice.amount -= payRequest.amount;
  }
}
