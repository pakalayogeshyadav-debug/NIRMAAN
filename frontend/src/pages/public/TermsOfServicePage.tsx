import { CivicPatternBackground } from '@/components/shared/CivicPatternBackground';

export function TermsOfServicePage() {
  return (
    <CivicPatternBackground variant="legal">


      <main className="flex-1 relative z-10 w-full max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">Terms of Service</h1>
          <p className="text-xl text-text-secondary">
            Rules and responsibilities for using NIRMAAN.
          </p>
        </div>

        <div className="prose prose-nirmaan max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using the NIRMAAN platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. About NIRMAAN</h2>
            <p className="leading-relaxed">
              NIRMAAN is a community platform intended to help users report waste, discover cleanup opportunities, coordinate community action, and track verified impact. It serves as a bridge between active citizens and organizations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Users must provide accurate, current, and complete information during registration.</li>
              <li>You are responsible for maintaining the security and confidentiality of your account credentials.</li>
              <li>You must not impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
              <li>Fraudulent accounts or attempts to manipulate the platform will result in immediate termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Waste Reports</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Users should submit genuine, current observations of waste or civic issues.</li>
              <li>Uploaded photos and location information must correspond accurately to the reported site.</li>
              <li>Duplicate, misleading, abusive, or deliberately false reports may be removed without notice.</li>
              <li>NIRMAAN reserves the right to review, classify, or reject submitted reports.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Cleanup Activities</h2>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Users participate in cleanup activities voluntarily and at their own risk.</li>
              <li>Participants should follow the safety instructions provided by organizers or site coordinators.</li>
              <li>Cleanup evidence (before/after photos) must accurately represent the activity performed.</li>
              <li>Users must not submit fabricated, modified, or otherwise false evidence of impact.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Verification</h2>
            <p className="leading-relaxed mb-4">
              To ensure the integrity of the platform, NIRMAAN may verify reports and impact claims using:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed mb-4">
              <li>Submitted photos and media metadata</li>
              <li>Location information and timestamps</li>
              <li>Confirmation from organizers and community members</li>
              <li>Automated or AI-assisted analysis</li>
            </ul>
            <p className="leading-relaxed font-medium text-text-primary">
              Note: Automated verification is an assistive mechanism and may be subject to manual review. We do not claim that AI verification is infallible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Rewards, Contributions & Funding</h2>
            <p className="leading-relaxed">
              Any rewards, sponsorships, funding, or contribution mechanisms shown by the platform are subject to the applicable program rules defined by the sponsoring entity. For the current prototype phase, NIRMAAN does not provide legally compliant financial or CSR services unless explicitly supported by verified backend integrations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Prohibited Activities</h2>
            <p className="leading-relaxed mb-2">You agree not to engage in any of the following:</p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Submitting fake reports or fraudulent evidence.</li>
              <li>Harassment, abuse, or harming others.</li>
              <li>Impersonation or creating accounts on behalf of others without authorization.</li>
              <li>Malicious uploads, viruses, or attempts to compromise platform security.</li>
              <li>Attempts to manipulate rewards, leaderboards, or verification systems.</li>
              <li>Unauthorized access to platform infrastructure or other users' data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. Content and Intellectual Property</h2>
            <p className="leading-relaxed">
              By submitting content (photos, reports, comments) to NIRMAAN, you grant us a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute that content in connection with operating and improving the platform. You retain ownership of your content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">10. Account Suspension and Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate your access to the platform at any time, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">11. Disclaimer</h2>
            <p className="leading-relaxed">
              NIRMAAN is a platform facilitating civic engagement. We do not guarantee immediate municipal action, cleanup, or resolution of every reported issue. The platform is provided "as is" and "as available" without any warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">12. Changes to the Service</h2>
            <p className="leading-relaxed">
              We reserve the right to withdraw or amend the platform, and any service or material we provide, in our sole discretion without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">13. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at support@nirmaan-app.example.com.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border-default text-sm text-text-tertiary">
          <p>Last updated: October 2026</p>
          <p className="mt-2 italic">
            Note: These documents describe the current NIRMAAN prototype and should be reviewed and adapted for production deployment.
          </p>
        </div>
      </main>
    </CivicPatternBackground>
  );
}
