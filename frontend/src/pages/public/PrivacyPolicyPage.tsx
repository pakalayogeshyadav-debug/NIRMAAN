import { CivicPatternBackground } from '@/components/shared/CivicPatternBackground';

export function PrivacyPolicyPage() {
  return (
    <CivicPatternBackground variant="legal">


      <main className="flex-1 relative z-10 w-full max-w-[800px] mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">Privacy Policy</h1>
          <p className="text-xl text-text-secondary">
            How NIRMAAN handles information used to support cleaner communities.
          </p>
        </div>

        <div className="prose prose-nirmaan max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed mb-4">
              We collect information that you provide directly to us when using the platform, which may include:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Name and contact details (email, mobile number).</li>
              <li>Account and organization information.</li>
              <li>Photos and media uploaded for waste reports or cleanup verification.</li>
              <li>Report details, descriptions, and categorizations.</li>
              <li>Location information when you explicitly choose to provide it or use location-based features.</li>
              <li>Cleanup activity participation records and impact tracking.</li>
              <li>Standard device and technical information necessary for the application to function.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. How We Use Information</h2>
            <p className="leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 leading-relaxed">
              <li>Creating, authenticating, and managing user and organization accounts.</li>
              <li>Processing, classifying, and displaying waste reports on the platform.</li>
              <li>Locating reported waste to coordinate accurate cleanup drives.</li>
              <li>Verifying the authenticity of submitted evidence and impact claims.</li>
              <li>Communicating important service information, updates, or notifications.</li>
              <li>Improving the platform's reliability, user experience, and features.</li>
              <li>Preventing abuse, fraud, and maintaining the integrity of our community.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Location Information</h2>
            <p className="leading-relaxed">
              Location data is requested specifically for features that require it, such as submitting accurate waste reports, discovering nearby cleanup activities, and verifying cleanup impact. We only capture location data when you actively use these features. NIRMAAN does not perform continuous background location tracking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Photos and Uploaded Content</h2>
            <p className="leading-relaxed">
              Images you upload to the platform may be processed for report classification, verification, duplicate detection, evidence review, and general platform functionality. These images may be visible to other users, organizations, or municipal partners to facilitate cleanup efforts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. AI-Assisted Processing</h2>
            <p className="leading-relaxed">
              We may utilize artificial intelligence and automated systems to assist with waste classification, severity assessment, duplicate detection, and image/evidence analysis. These AI systems act in an assistive capacity and do not independently make final, binding decisions in every case.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Information Sharing</h2>
            <p className="leading-relaxed">
              Information may be shared where necessary for platform functionality, such as sharing report locations and photos with participating organizations and volunteers to coordinate cleanups. We may also share information with trusted service providers who assist in operating the platform, or when required by legal obligations. NIRMAAN does not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Data Security</h2>
            <p className="leading-relaxed">
              We employ reasonable organizational, technical, and administrative measures designed to protect your personal information against unauthorized access, destruction, or alteration. While we strive to protect your data, no method of transmission over the internet or electronic storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your information for as long as your account is active or as necessary to provide platform functionality, fulfill the purposes outlined in this policy, resolve disputes, verify historical impact records, and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. User Rights and Choices</h2>
            <p className="leading-relaxed">
              Subject to applicable technical constraints, you have the right to request access to, correction of, or deletion of your personal information. You can manage certain profile details directly through your account settings. For deletion requests, please contact our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">10. Children's Privacy</h2>
            <p className="leading-relaxed">
              NIRMAAN is not intended for use by children under the applicable minimum age without parental consent. We do not knowingly collect personal information from children without appropriate authorization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">11. Changes to this Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on the platform or through other appropriate communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">12. Contact</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@nirmaan-app.example.com.
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
