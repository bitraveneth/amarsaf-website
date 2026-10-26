import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { adminSignIn } from "@/lib/admin-actions";
import { LoginForm, type DemoAccount } from "@/components/admin/login-form";

function demoAccounts(): DemoAccount[] {
  const rows: Array<DemoAccount | null> = [
    process.env.SUPERADMIN_EMAIL && process.env.SUPERADMIN_PASSWORD
      ? {
          role: "SUPERADMIN",
          label: "Superadmin",
          email: process.env.SUPERADMIN_EMAIL,
          password: process.env.SUPERADMIN_PASSWORD,
          hint: "Full access — users, settings, publish",
        }
      : null,
    process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD
      ? {
          role: "ADMIN",
          label: "Admin",
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          hint: "Publish content and edit settings",
        }
      : null,
    process.env.STAFF_EMAIL && process.env.STAFF_PASSWORD
      ? {
          role: "STAFF",
          label: "Staff",
          email: process.env.STAFF_EMAIL,
          password: process.env.STAFF_PASSWORD,
          hint: "Draft content — publish requires Admin",
        }
      : null,
  ];
  return rows.filter((r): r is DemoAccount => r !== null);
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/admin";
  const demos = demoAccounts();

  async function login(formData: FormData) {
    "use server";
    formData.set("callbackUrl", callbackUrl);
    const result = await adminSignIn(formData);
    if (!result.ok) {
      redirect(
        `/admin/login?error=${encodeURIComponent(result.error)}&callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(26rem,0.9fr)]">
      <div className="relative hidden overflow-hidden bg-[#0b1220] lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(48rem_32rem_at_15%_15%,rgb(109_43_213/0.5),transparent_55%),radial-gradient(40rem_28rem_at_95%_85%,rgb(75_44_215/0.35),transparent_50%),linear-gradient(160deg,#0b1220_0%,#151f33_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-14">
          <Link href="/" className="inline-flex items-center gap-3.5">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Image src="/brand/saf-logomark.svg" alt="" width={32} height={32} />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight text-white">
                SAF CMS
              </span>
              <span className="block text-sm text-slate-400">Content studio</span>
            </span>
          </Link>

          <div className="max-w-lg">
            <p className="text-sm font-semibold tracking-[0.14em] text-violet-300 uppercase">
              Editor console
            </p>
            <h1 className="mt-4 text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.04em] text-white xl:text-[3.25rem]">
              Run the website from one place.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
              Update hero slides, homepage sections, products, news, and media — then publish
              straight to the live SAF site.
            </p>
            <ul className="mt-10 grid gap-3 text-sm text-slate-300">
              {[
                "Homepage & hero editing",
                "Products, news, FAQ, jobs",
                "Media library & site settings",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-slate-500">SAF Food & Beverage Ltd.</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(36rem_24rem_at_80%_0%,rgb(109_43_213/0.08),transparent_55%),linear-gradient(180deg,#f8f7fc_0%,#f1f3f6_45%,#eef0f4_100%)]"
        />
        <div className="relative w-full max-w-[27rem]">
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                <Image src="/brand/saf-logomark.svg" alt="" width={28} height={28} />
              </span>
              <span>
                <span className="block text-base font-semibold">SAF CMS</span>
                <span className="block text-xs text-slate-500">Content studio</span>
              </span>
            </Link>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/90 shadow-[0_24px_64px_-28px_rgb(15_23_42/0.35),0_8px_24px_-12px_rgb(91_33_182/0.12)] backdrop-blur-sm">
            <div className="relative overflow-hidden px-7 pt-8 pb-6 sm:px-9 sm:pt-9">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(28rem_12rem_at_50%_-20%,rgb(109_43_213/0.16),transparent_70%)]"
              />
              <div className="relative">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-[0_12px_28px_-10px_rgb(91_33_182/0.85)]">
                  <Image
                    src="/brand/saf-logomark.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="brightness-0 invert"
                  />
                </div>
                <h2 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.035em] text-slate-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Sign in to edit and publish SAF website content.
                </p>
              </div>
            </div>

            <div className="px-7 pb-8 sm:px-9 sm:pb-9">
              <LoginForm action={login} error={params.error} demos={demos} />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            <Link href="/" className="font-medium text-violet-700 transition-colors hover:text-violet-900">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
