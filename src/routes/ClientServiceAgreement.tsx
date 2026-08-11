import { Link } from "react-router-dom";
import { FileText, Download, ShieldCheck } from "lucide-react";
import clientAgreementPdf from "../assets/client-service-agreement.pdf";

type Section = {
  number: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  subsections?: { title: string; paragraphs?: string[]; list?: string[] }[];
};

const sections: Section[] = [
  {
    number: "1",
    title: "Definitions",
    paragraphs: [
      "This Agreement uses defined terms throughout, including “Services,” “Authority,” “Application,” “Client,” “Project Documents,” “Fees,” “Permit,” “Grant,” “Business Day,” “Confidential Information,” “Force Majeure Event,” and “Successful Project.” Each carries the meaning set out in the full Agreement, covering the business consulting, regulatory, registration, grant, procurement, project management, training, and advisory services R-Pro Business Consult provides.",
      "A “Successful Project” is any outcome formally communicated by the relevant Institution or Third Party — an approval, registration, funding award, licence, or similar result. This does not imply R-Pro Business Consult guaranteed or caused that outcome.",
    ],
  },
  {
    number: "2",
    title: "Scope of Services",
    paragraphs: [
      "Subject to the package, engagement, or service plan selected and payment of applicable Fees, R-Pro Business Consult may provide services across the following areas:",
    ],
    list: [
      "Business registration and corporate compliance — incorporation, business name and NGO registration, post-incorporation filings, annual returns, and corporate secretarial support.",
      "Business advisory and consulting — business planning, restructuring, feasibility studies, market entry strategy, and growth planning.",
      "Regulatory compliance — compliance assessments, policy development, regulatory filings, and governance framework development.",
      "Grant and funding advisory — identifying funding opportunities and supporting proposal development, documentation, and donor compliance.",
      "Procurement and tender support — bid documentation, proposal writing, eligibility assessment, and submission support.",
      "Project management and implementation support — planning, monitoring, evaluation, and stakeholder engagement.",
      "Training and capacity development — workshops, coaching, mentoring, and leadership development programmes.",
      "Corporate advisory — governance, organisational development, and institutional strengthening.",
      "Research and proposal development — market research, concept notes, business cases, and investment memoranda.",
      "Ancillary services agreed in writing between the Parties from time to time.",
    ],
    subsections: [
      {
        title: "No Guarantee of Outcome",
        paragraphs: [
          "R-Pro Business Consult provides professional advisory, consulting, facilitation, and support services only. It does not guarantee registrations, regulatory approvals, grant or funding decisions, investment commitments, contract or procurement awards, business profitability, or any other result that depends on the discretion of an Institution or Third Party. All such decisions remain solely within the discretion of the relevant body, and R-Pro Business Consult is not liable for an unsuccessful outcome.",
        ],
      },
    ],
  },
  {
    number: "3",
    title: "Service Standards and Client Communication",
    paragraphs: [
      "R-Pro Business Consult performs the Services with reasonable skill, care, diligence, and professionalism consistent with accepted consulting practice, using commercially reasonable efforts and appropriately qualified personnel. Consulting services involve recommendations, analysis, and professional opinion based on available information — implementation decisions remain the Client's responsibility.",
      "R-Pro Business Consult maintains regular communication with the Client, keeping them informed of material developments, notifying them of relevant regulatory or procedural requirements, requesting additional information where necessary, and responding to reasonable enquiries within commercially reasonable timeframes.",
    ],
  },
  {
    number: "4",
    title: "No Guarantee of Outcomes",
    paragraphs: [
      "R-Pro Business Consult acts solely as a consultant, adviser, facilitator, project coordinator, trainer, researcher, and compliance adviser. It does not control government agencies, regulators, funding institutions, investors, procurement entities, or any other Third Party whose approval or decision may be required.",
      "While R-Pro Business Consult applies reasonable skill and diligence, it does not warrant or guarantee the success of any registration, licence, grant, funding request, investment, procurement award, certification, or business initiative — including profitability, revenue, or achievement of strategic objectives.",
      "Approvals, registrations, grants, and similar outcomes are determined exclusively by the relevant Institution based on its own criteria and discretion, independent of R-Pro Business Consult. Provided the Consultant performs with reasonable professional care, it is not liable where an Application is rejected, delayed, or otherwise unsuccessful, including where this results from changes in law, policy, market conditions, or third-party system failures.",
      "Fees are consideration solely for the professional services, expertise, and support provided — not for any guaranteed approval, grant, funding, or other specific outcome. The value of the Services lies in the professional support provided, irrespective of whether a Project achieves the desired result.",
    ],
  },
  {
    number: "5",
    title: "Client Obligations",
    paragraphs: [
      "The Client shall cooperate fully with R-Pro Business Consult and provide all information, documents, approvals, and assistance reasonably required to perform the Services, including:",
    ],
    list: [
      "Providing complete, accurate, and timely information relevant to the engagement.",
      "Supplying authentic and lawful documents required for the Services.",
      "Participating actively — feedback, instructions, and decisions when required.",
      "Attending meetings, consultations, and training sessions as reasonably required.",
      "Reviewing and approving deliverables promptly to avoid delays.",
      "Complying with applicable laws, regulations, and industry requirements.",
      "Obtaining necessary internal approvals and consents.",
      "Paying all Fees, charges, and expenses when due.",
    ],
    subsections: [
      {
        title: "Accuracy and Reliance",
        paragraphs: [
          "The Client warrants that all information and documents supplied are accurate, complete, authentic, and not misleading. R-Pro Business Consult may rely on this information without independently verifying it, and the Client bears sole responsibility for any loss, delay, or adverse outcome arising from false, incomplete, or unlawful information, or from failing to meet its obligations under this Agreement.",
        ],
      },
    ],
  },
  {
    number: "6",
    title: "Fees and Payment",
    paragraphs: [
      "Fees are communicated via an Engagement Letter, Retainer Agreement, Quotation, Invoice, Project Proposal, or similar written communication, and depend on the nature, scope, and complexity of the Services.",
    ],
    list: [
      "Fees are payable in advance before Services commence, unless otherwise agreed in writing.",
      "R-Pro Business Consult is not obliged to commence or continue Services until payment is received.",
      "Invoices become due immediately upon issuance unless otherwise stated.",
      "VAT, taxes, bank charges, and transaction costs are borne by the Client.",
      "Services or deliverables may be suspended or withheld where payment is outstanding.",
      "Retainer fees are payable in advance and unused allocations do not roll over unless agreed in writing.",
      "Work outside the agreed scope attracts additional fees.",
      "The Client bears all third-party fees — statutory, filing, licensing, and certification charges.",
      "Fees are not contingent upon any approval, grant, funding, or other specific outcome.",
    ],
  },
  {
    number: "7",
    title: "Third-Party Services",
    paragraphs: [
      "Certain Services require R-Pro Business Consult to liaise, coordinate, or file on the Client's behalf with Institutions such as the Corporate Affairs Commission, FIRS and State Internal Revenue Services, NAFDAC, SON, SEC, SCUML, procurement entities, donor organisations, financiers, and relevant government ministries and regulatory bodies.",
      "These Third Parties operate independently and retain sole authority over their own decisions, policies, and timelines. R-Pro Business Consult is not liable for any act, delay, refusal, or requirement imposed by a Third Party, including changes in law, processing timelines, or system outages affecting their platforms. The Client remains responsible for all fees, levies, and requirements owed directly to a Third Party, and no claim shall lie against R-Pro Business Consult solely because a Third Party delays, rejects, or otherwise adversely determines a matter.",
    ],
  },
  {
    number: "8",
    title: "Withdrawal and Refunds",
    paragraphs: [
      "The Client may withdraw from the engagement at any time by written notice. Where the Client withdraws before substantial work has commenced, R-Pro Business Consult may, at its discretion, refund fees paid, less any administrative, processing, or onboarding costs already incurred.",
      "Once Services have commenced — through consultations, research, document preparation, advisory meetings, or submissions — all consultancy and advisory fees are deemed earned and non-refundable, and third-party expenses incurred on the Client's behalf are not refundable.",
      "No refund, compensation, or fee reduction arises merely because a grant, loan, licence, tender, or business objective is unsuccessful, delayed, or declined, or because the Client decides not to proceed after work has commenced. Except as expressly provided, all fees paid are final and non-refundable, and any approved refund is processed after deduction of applicable costs and charges.",
    ],
  },
  {
    number: "9",
    title: "Limitation of Liability",
    paragraphs: [
      "R-Pro Business Consult provides advisory and consulting services based on Client-supplied information and professional judgment, and does not guarantee any specific commercial, financial, or regulatory outcome.",
      "To the fullest extent permitted by law, R-Pro Business Consult and its directors, employees, and affiliates are not liable for loss of business opportunities, anticipated revenue or profits, unsuccessful tenders or funding applications, rejected or delayed regulatory approvals, operational or reputational loss, or any indirect, incidental, or consequential damages — nor for loss arising from inaccurate Client information, the Client's failure to act on advice, changes in law or market conditions, or acts of third parties beyond the Consultant's control.",
      "No claim may be brought against the Consultant more than twelve (12) months after the event giving rise to it. The Consultant's aggregate liability, however arising, shall not exceed the total fees actually paid by the Client for the specific Service giving rise to the claim, and these limitations survive completion or termination of the engagement.",
    ],
  },
  {
    number: "10",
    title: "Independent Contractor Relationship",
    paragraphs: [
      "R-Pro Business Consult is engaged solely as an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, agency, or fiduciary relationship. The Consultant retains full control over the manner, method, and personnel used to perform the Services, may serve other clients during the term of this Agreement provided no conflict of interest arises, and has no authority to make representations or incur obligations on the Client's behalf unless expressly authorised in writing.",
    ],
  },
  {
    number: "11",
    title: "Conflict of Interest",
    paragraphs: [
      "R-Pro Business Consult may serve multiple clients, including those in similar sectors, without this alone constituting a conflict of interest — provided confidential information is protected and no professional duty is breached. Where an actual conflict arises, the Consultant will promptly disclose it and implement reasonable measures to manage it.",
    ],
  },
  {
    number: "12",
    title: "Non-Solicitation and Client Indemnity",
    paragraphs: [
      "During the engagement and after its termination, the Client shall not employ, engage, solicit, or induce to leave any employee or representative of R-Pro Business Consult who was involved in the engagement. A breach entitles R-Pro Business Consult to liquidated damages equal to six months of the individual's remuneration.",
      "The Client shall indemnify and hold harmless R-Pro Business Consult against claims, losses, and reasonable legal expenses arising from false or misleading information, unlawful documents, breach of this Agreement, or the Client's unlawful conduct — except to the extent a claim arises directly from R-Pro Business Consult's own gross negligence, fraud, or wilful misconduct. This indemnity survives termination of the Agreement.",
    ],
  },
  {
    number: "13",
    title: "Force Majeure",
    paragraphs: [
      "Neither Party is liable for delay or failure to perform due to events beyond its reasonable control — government actions, natural disasters, pandemics, civil unrest, cyber incidents, or third-party disruptions. Affected obligations are suspended for the duration of the event, and the affected Party must promptly notify the other and use reasonable efforts to mitigate impact.",
      "Where such an event continues for more than sixty consecutive days and materially affects the Services, either Party may terminate by written notice without further liability, though the Client remains liable for work completed and fees for third-party costs incurred before termination.",
    ],
  },
  {
    number: "14",
    title: "Termination",
    paragraphs: [
      "Either Party may terminate this Agreement on fourteen (14) days' written notice. R-Pro Business Consult may terminate immediately where the Client provides false information, materially breaches the Agreement without remedy, engages in unlawful conduct, fails to pay Fees, or exposes the Consultant to legal or reputational risk.",
      "On termination, Services cease, all outstanding fees and third-party costs become immediately due, and clauses relating to fees, confidentiality, indemnity, and limitation of liability survive. Termination does not entitle the Client to a refund of fees already earned or paid to third parties, except where required by law.",
    ],
  },
  {
    number: "15",
    title: "Governing Law and Dispute Resolution",
    paragraphs: [
      "This Agreement is governed by the laws of the Federal Republic of Nigeria. Disputes are resolved in good faith through direct negotiation within fourteen (14) days of written notice. If unresolved, the dispute is referred to arbitration at the Lagos Multi-door Courthouse, seated in Lagos, conducted in English before a single arbitrator, with a final and binding award. Where arbitration is not pursued, the matter is subject to the exclusive jurisdiction of the competent courts of Lagos State.",
    ],
  },
  {
    number: "16",
    title: "Severability",
    paragraphs: [
      "If any provision is held invalid, illegal, or unenforceable, it shall be modified to the minimum extent necessary to make it valid, or deemed deleted if modification is not possible — without affecting the validity of the remaining provisions.",
    ],
  },
  {
    number: "17",
    title: "Counterparts and Electronic Execution",
    paragraphs: [
      "This Agreement may be executed in counterparts, each deemed an original, and a counterpart executed and transmitted electronically is valid and binding under Nigerian law.",
    ],
  },
  {
    number: "18",
    title: "Entire Agreement and Amendments",
    paragraphs: [
      "This Agreement, together with its Schedules, constitutes the entire agreement between the Parties and supersedes all prior discussions or understandings. No amendment is valid unless in writing and signed by authorised representatives of both Parties. Where the Agreement and a Schedule conflict, this Agreement prevails unless the Schedule expressly states otherwise.",
    ],
  },
  {
    number: "19",
    title: "Client Acceptance",
    paragraphs: [
      "By signing this Agreement, the Client confirms they have read and understood it in full, understand that outcomes such as approvals, grants, and visas are not guaranteed, agree to any milestone-based payment structure, consent to the processing of their data in accordance with the NDPA 2023, agree to comply with all programme requirements and timelines, and accept the indemnity obligations set out in this Agreement. The Agreement becomes legally binding upon execution by both Parties.",
    ],
  },
];

export default function ClientServiceAgreement() {
  return (
    <main className="bg-white text-brand-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-ink text-white">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-navy/40 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <div className="flex items-center gap-2 text-brand-red mb-4">
            <FileText className="size-5" />
            <span className="text-sm uppercase tracking-wider text-white/70">Legal</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Client Service Agreement
          </h1>
          <p className="mt-4 text-white/70 leading-relaxed max-w-2xl">
            This Agreement governs the professional relationship between R-Pro Business
            Consult Services Limited and its Clients. Please read it carefully before
            engaging us for any consulting, advisory, or support service.
          </p>
          <p className="mt-4 text-xs text-white/50">
            Confidential © R-Pro Business Consult 2026 · Effective as of the date of
            execution between the Parties
          </p>
        </div>
      </section>

      {/* Intro / parties */}
      <section className="mx-auto max-w-4xl px-6 py-12 border-b border-black/5">
        <div className="flex gap-3 items-start rounded-lg bg-brand-ink/[0.03] p-5">
          <ShieldCheck className="size-5 mt-0.5 shrink-0 text-brand-red" />
          <p className="text-sm leading-relaxed text-brand-ink/80">
            This Agreement is made between{" "}
            <strong>R-Pro Business Consult Services Limited</strong>, a company
            incorporated under the Companies and Allied Matters Act, 2020, with its
            registered office at House 13, Road 1, Lekki Gardens Estate, Sangotedo,
            Lagos State, Nigeria (“R-Pro Business Consult,” “Consultant,” or “Service
            Provider”), and the Client engaging R-Pro Business Consult for one or more
            consulting, advisory, business support, or project-related services
            (“Client” or “Applicant”). R-Pro Business Consult provides advisory,
            consultancy, and facilitation services only — business outcomes, grant
            approvals, funding decisions, and regulatory approvals cannot be guaranteed.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-4xl px-6 py-4">
        {sections.map((s) => (
          <div key={s.number} id={`section-${s.number}`} className="py-8 border-b border-black/5 last:border-0">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-brand-red text-sm font-semibold">
                {s.number}
              </span>
              <h2 className="font-display text-xl font-bold text-brand-ink">
                {s.title}
              </h2>
            </div>

            {s.paragraphs?.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-brand-ink/80 mb-4">
                {p}
              </p>
            ))}

            {s.list && (
              <ul className="space-y-2 mb-4">
                {s.list.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-brand-ink/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {s.subsections?.map((sub, i) => (
              <div key={i} className="mt-4 pl-4 border-l-2 border-brand-red/30">
                <h3 className="font-display text-sm font-semibold text-brand-ink mb-2">
                  {sub.title}
                </h3>
                {sub.paragraphs?.map((p, j) => (
                  <p key={j} className="text-sm leading-relaxed text-brand-ink/80 mb-2">
                    {p}
                  </p>
                ))}
                {sub.list && (
                  <ul className="space-y-2">
                    {sub.list.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-brand-ink/80">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Footer note / download */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-lg bg-brand-navy/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-brand-ink/70 leading-relaxed max-w-xl">
            This page is a summary for reference. The full, executable Agreement —
            including signature blocks — is issued directly to each Client as part of
            onboarding.
          </p>
          <a
            href={clientAgreementPdf}
            download="R-Pro-Business-Consult-Client-Service-Agreement.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-elegant hover:opacity-90 transition"
          >
            <Download className="size-4" />
            Download PDF
          </a>
        </div>
        <p className="mt-6 text-xs text-brand-ink/50">
          Have questions about this Agreement?{" "}
          <Link to="/contact" className="text-brand-red hover:underline">
            Contact us
          </Link>
          .
        </p>
      </section>
    </main>
  );
}