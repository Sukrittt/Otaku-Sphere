import Link from "next/link";
import { Metadata } from "next";

import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { Separator } from "@/ui/Separator";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { env } from "@/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Terms and Conditions",
  description:
    "Read and understand our terms and conditions that govern the usage of this platform. Familiarize yourself with the guidelines to ensure a smooth and compliant experience.",
};

const TermsPage = () => {
  return (
    <Shell layout="markdown">
      <div>
        <Header
          title="Terms & Conditions"
          description="Read the terms and conditions of Otaku Sphere."
        />
        <Separator className="my-4" />
        <p className="font-light text-sm">
          These terms and conditions govern your use of this website; by using
          this website, you accept these terms and conditions in full. If you
          disagree with these terms and conditions or any part of these terms
          and conditions, you must not use this website.
        </p>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          1. License to use website
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Unless otherwise stated, Otaku Sphere and/or its licensors own the
            intellectual property rights in the website and material on the
            website. Subject to the license below, all these intellectual
            property rights are reserved.
          </p>
          <p className="font-light text-sm">
            You may view, download for caching purposes only, and print pages or
            other content from the website for your own personal use, subject to
            the restrictions set out below and elsewhere in these terms and
            conditions.
          </p>
          <p className="font-light text-sm">You must not:</p>
          <ul className="space-y-4 font-light text-sm list-disc mx-4">
            <li>
              republish material from this website (including republication on
              another website)
            </li>
            <li>show any material from the website in public</li>
            <li>
              reproduce, duplicate, copy or otherwise exploit material on this
              website for a commercial purpose
            </li>
            <li>edit or otherwise modify any material on the website or</li>
            <li>
              redistribute material from this website except for content
              specifically and expressly made available for redistribution.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          2. Acceptable use
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            You must not use this website in any way that causes, or may cause,
            damage to the website or impairment of the availability or
            accessibility of the website; or in any way which is unlawful,
            illegal, fraudulent or harmful, or in connection with any unlawful,
            illegal, fraudulent or harmful purpose or activity.
          </p>
          <p className="font-light text-sm">
            You must not use this website to copy, store, host, transmit, send,
            use, publish or distribute any material which consists of (or is
            linked to) any spyware, computer virus, Trojan horse, worm,
            keystroke logger, rootkit or other malicious computer software.
          </p>
          <p className="font-light text-sm">
            You must not conduct any systematic or automated data collection
            activities (including without limitation scraping, data mining, data
            extraction and data harvesting) on or in relation to this website
            without Otaku Sphere&rsquo;s express written consent.
          </p>
          <p className="font-light text-sm">
            You must not use this website to transmit or send unsolicited
            commercial communications.
          </p>
          <p className="font-light text-sm">
            You must not use this website for any purposes related to marketing
            without Otaku Sphere&rsquo;s express written consent.
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          3. Restricted access
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Access to certain areas of this website is restricted. Otaku Sphere
            reserves the right to restrict access to areas of this website, or
            indeed this entire website, at Otaku Sphere&rsquo;s discretion.
          </p>
          <p className="font-light text-sm">
            If Otaku Sphere provides you with admin roles to enable you to
            access restricted areas of this website or other content or
            services, you must ensure that you do not share your admin roles
            with any other person or entity.
          </p>
          <p className="font-light text-sm">
            Otaku Sphere may disable your account in Otaku Sphere&rsquo;s sole
            discretion without notice or explanation.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          4. User content
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            In these terms and conditions, “your user content” means material
            (including without limitation text, images, audio material, video
            material and audio-visual material) that you submit to this website,
            for whatever purpose.
          </p>
          <p className="font-light text-sm">
            You grant to Otaku Sphere a worldwide, irrevocable, non-exclusive,
            royalty-free license to use, reproduce, adapt, publish, translate
            and distribute your user content in any existing or future media.
            You also grant to Otaku Sphere the right to sub-license these
            rights, and the right to bring an action for infringement of these
            rights.
          </p>
          <p className="font-light text-sm">
            Your user content must not be illegal or unlawful, must not infringe
            any third party&rsquo;s legal rights, and must not be capable of
            giving rise to legal action whether against you or Otaku Sphere or a
            third party (in each case under any applicable law).
          </p>
          <p className="font-light text-sm">
            You must not submit any user content to the website that is or has
            ever been the subject of any threatened or actual legal proceedings
            or other similar complaint.
          </p>
          <p className="font-light text-sm">
            Otaku Sphere reserves the right to edit or remove any material
            submitted to this website, or stored on Otaku Sphere&rsquo;s
            servers, or hosted or published upon this website.
          </p>
          <p className="font-light text-sm">
            Notwithstanding Otaku Sphere&rsquo;s rights under these terms and
            conditions in relation to user content, Otaku Sphere does not
            undertake to monitor the submission of such content to, or the
            publication of such content on, this website.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          5. No warranties
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            This website is provided “as is” without any representations or
            warranties, express or implied. Otaku Sphere makes no
            representations or warranties in relation to this website or the
            information and materials provided on this website.
          </p>
          <p className="font-light text-sm">
            Without prejudice to the generality of the foregoing paragraph,
            Otaku Sphere does not warrant that:
          </p>
          <ul className="space-y-4 font-light text-sm list-disc mx-4">
            <li>
              this website will be constantly available, or available at all or
            </li>
            <li>
              the information on this website is complete, true, accurate or
              non-misleading.
            </li>
          </ul>
          <p className="font-light text-sm">
            Nothing on this website constitutes, or is meant to constitute,
            advice of any kind. If you require advice in relation to any legal,
            financial or medical matter you should consult an appropriate
            professional.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          6. Limitations of liability
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Otaku Sphere will not be liable to you (whether under the law of
            contact, the law of torts or otherwise) in relation to the contents
            of, or use of, or otherwise in connection with, this website:
          </p>
          <ul className="space-y-4 font-light text-sm list-disc mx-4">
            <li>
              to the extent that the website is provided free-of-charge, for any
              direct loss
            </li>
            <li>for any indirect, special or consequential loss or</li>
            <li>
              for any business losses, loss of revenue, income, profits or
              anticipated savings, loss of contracts or business relationships,
              loss of reputation or goodwill, or loss or corruption of
              information or data.
            </li>
          </ul>
          <p className="font-light text-sm">
            These limitations of liability apply even if Otaku Sphere has been
            expressly advised of the potential loss.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">7. Exceptions</h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Nothing in this website disclaimer will exclude or limit any
            warranty implied by law that it would be unlawful to exclude or
            limit; and nothing in this website disclaimer will exclude or limit
            Otaku Sphere&rsquo;s liability in respect of any:
          </p>
          <ul className="space-y-4 font-light text-sm list-disc mx-4">
            <li>
              death or personal injury caused by Otaku Sphere&rsquo;s negligence
            </li>
            <li>
              raud or fraudulent misrepresentation on the part of Otaku Sphere
              or
            </li>
            <li>
              matter which it would be illegal or unlawful for Otaku Sphere to
              exclude or limit, or to attempt or purport to exclude or limit,
              its liability.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          8. Reasonableness
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            By using this website, you agree that the exclusions and limitations
            of liability set out in this website disclaimer are reasonable.
          </p>
          <p className="font-light text-sm">
            If you do not think they are reasonable, you must not use this
            website.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          9. Unenforceable provisions
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            If any provision of this website disclaimer is, or is found to be,
            unenforceable under applicable law, that will not affect the
            enforceability of the other provisions of this website disclaimer.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">10. Indemnity</h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            You hereby indemnify Otaku Sphere and undertake to keep Otaku Sphere
            indemnified against any losses, damages, costs, liabilities and
            expenses (including without limitation legal expenses and any
            amounts paid by Otaku Sphere to a third party in settlement of a
            claim or dispute on the advice of Otaku Sphere&rsquo;s legal
            advisers) incurred or suffered by Otaku Sphere arising out of any
            breach by you of any provision of these terms and conditions, or
            arising out of any claim that you have breached any provision of
            these terms and conditions.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          11. Breaches of these terms and conditions
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Without prejudice to Otaku Sphere&rsquo;s other rights under these
            terms and conditions, if you breach these terms and conditions in
            any way, Otaku Sphere may take such action as Otaku Sphere deems
            appropriate to deal with the breach, including suspending your
            access to the website, prohibiting you from accessing the website,
            blocking computers using your IP address from accessing the website,
            contacting your internet service provider to request that they block
            your access to the website and/or bringing court proceedings against
            you.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">12. Variation</h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Otaku Sphere may revise these terms and conditions from
            time-to-time. Revised terms and conditions will apply to the use of
            this website from the date of the publication of the revised terms
            and conditions on this website. Please check this page regularly to
            ensure you are familiar with the current version.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">13. Assignment</h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            Otaku Sphere may transfer, sub-contract or otherwise deal with Otaku
            Sphere&rsquo;s rights and/or obligations under these terms and
            conditions without notifying you or obtaining your consent.
          </p>
          <p className="font-light text-sm">
            You may not transfer, sub-contract or otherwise deal with your
            rights and/or obligations under these terms and conditions.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          14. Severability
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            If a provision of these terms and conditions is determined by any
            court or other competent authority to be unlawful and/or
            unenforceable, the other provisions will continue in effect. If any
            unlawful and/or unenforceable provision would be lawful or
            enforceable if part of it were deleted, that part will be deemed to
            be deleted, and the rest of the provision will continue in effect.
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          15. Entire agreement
        </h1>
        <Separator className="my-2" />
        <div className="space-y-5 mt-4">
          <p className="font-light text-sm">
            These terms and conditions constitute the entire agreement between
            you and Otaku Sphere in relation to your use of this website, and
            supersede all previous agreements in respect of your use of this
            website.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <Link
          href="/privacy"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-fit"
          )}
        >
          <Icons.left className="mr-2 h-4 w-4" />
          Privacy Policy
        </Link>
      </div>
    </Shell>
  );
};

export default TermsPage;
