import Link from "next/link";

export default function HelloWorld() {
    return (
        <div className="min-h-screen flex flex-col items-center px-8 sm:px-12 border-box">
            {/* Top spacer: grows to center content, but never shrinks below 20vh */}
            <div className="grow min-h-[15vh] sm:min-h-[15vh]"></div>

            <div className="relative w-full max-w-md text-left shrink-0 my-8">
                <Link
                    href="/essays"
                    className="absolute -top-12 left-0 font-[var(--font-space-mono)] text-sm text-gray-400 hover:text-black transition-colors"
                >
                    ← back
                </Link>
                <h1 className="font-[var(--font-space-mono)] font-bold text-lg mb-1">bevofit - devlog 1</h1>
                <h2 className="font-[var(--font-space-mono)] font-medium text-sm text-gray-400 mb-8">mon, apr 20th</h2>
                <div className="space-y-6 font-[var(--font-space-mono)] text-sm text-gray-500 leading-relaxed">
                    {/* <h1 className="font-[var(--font-space-mono)] font-semibold text-lg mb-3 text-gray-700">title</h1> */}
                    <p>
                        welcome to the BevoFit devlog, a weekly journal where i'll be describing my experience building the app. <a href="https://apps.apple.com/us/app/bevofit/id6758592301" className="underline">BevoFit</a> is an app for UT students to explore everything RecSports has to offer on campus.
                    </p>
                    <p>
                        unlike what "devlog #1" suggests, BevoFit has been in development since October and production since December.
                        this last week was all about marketing, and i realized i could use this opportunity to write logs on my experience.
                    </p>
                    <h1 className="font-[var(--font-space-mono)] font-semibold text-lg mb-3 text-gray-700">attention is king</h1>
                    <p>
                        this all started last sunday, when i made basic posters for the app. at first, i put posters up all over the <a href="/bevofit-imgs/bevofitpostergreg.jpeg" target="_blank" rel="noopener noreferrer" className="underline">greg walkway</a>,
                        but i realized at the end that i might've posted them in illegal places. trash cans, lamp posts - all torn clean off within hours. also, nobody was scanning the posters - everyone
                        was scrolling on their walks or not looking at the 13 QR codes in front of them.
                    </p>

                    <p>
                        i shifted after this to two strategies: put all posters in areas where people stand, and clipfarm on the posters.

                        i realized that our gym's didn't allow for posters anywhere, so i just put posters in waiting areas, elevator lobbies, etc.

                        this strat alone got me 30 downloads in 3 days, but i needed more attention.

                    </p>

                    <p>
                        this is when i stumbled on ditto posters. someone's obviously scanning a poster that says "want a matcha date?" over my basic poster,
                        so i realized that i had to hop on this idea.

                        i quickly designed a few clipfarm posters with a QR code to scan. something that you had to notice. i'm waiting
                        on download results for this new design, so stay tuned for next week (where there will be actual dev!).
                    </p>

                </div>
            </div>

            {/* Bottom spacer balances the top one so it's vertically centered when short */}
            <div className="grow min-h-[10vh] sm:min-h-[10vh]"></div>
        </div>
    );
}
