import React from "react";

const WhyUpgradePlan = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

            {/* Header */}
            <div className="bg-primary text-white text-center p-5">
              <h2 className="fw-bold mb-3">
                🚀 আপনার পোস্টকে সবার আগে দেখাতে চান?
              </h2>
              <p className="mb-0 fs-5">
                Thikana Upgrade Plan ব্যবহার করুন
              </p>
            </div>

            <div className="card-body p-5">

              {/* Intro */}
              <p className="text-muted fs-5">
                Thikana একটি সম্পূর্ণ উন্মুক্ত প্ল্যাটফর্ম, যেখানে আপনি বিনামূল্যে
                প্রপার্টি পোস্ট করতে পারেন। তবে পোস্টের সংখ্যা বাড়লে গুরুত্বপূর্ণ
                পোস্ট নিচে চলে যেতে পারে।
              </p>

              <div className="alert alert-info rounded-3">
                💡 এই সমস্যার সমাধান হিসেবে আমরা এনেছি <b>Upgrade Plan System</b> —
                সম্পূর্ণ ঐচ্ছিক, শুধুমাত্র আপনার সুবিধার জন্য।
              </div>

              {/* Plan Section */}
              <h4 className="fw-bold mt-5 mb-4 text-center">
                📊 পোস্ট প্রদর্শন পদ্ধতি
              </h4>

              <div className="row g-3 text-center">

                <div className="col-md-3">
                  <div className="p-3 border rounded-3 bg-warning-subtle">
                    <h6 className="fw-bold">🔶 Premium</h6>
                    <p className="mb-0 small">Top 1 – 10</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 border rounded-3 bg-warning">
                    <h6 className="fw-bold text-dark">🔷 Golden</h6>
                    <p className="mb-0 small">11 – 20</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 border rounded-3 bg-secondary text-white">
                    <h6 className="fw-bold">🔹 Silver</h6>
                    <p className="mb-0 small">21 – 30</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="p-3 border rounded-3 bg-light">
                    <h6 className="fw-bold">⬇️ Regular</h6>
                    <p className="mb-0 small">30+</p>
                  </div>
                </div>

              </div>

              {/* Benefits */}
              <h4 className="fw-bold mt-5 mb-3">🚀 Upgrade করলে সুবিধা</h4>
              <ul className="list-group mb-4">
                <li className="list-group-item">✅ Top position-এ পোস্ট দেখাবে</li>
                <li className="list-group-item">👀 বেশি visibility</li>
                <li className="list-group-item">⚡ দ্রুত response পাওয়ার সম্ভাবনা</li>
                <li className="list-group-item">📈 বেশি user attention</li>
              </ul>

              {/* Free Info */}
              <div className="alert alert-success">
                🆓 Upgrade না করলেও আপনার পোস্ট স্বাভাবিকভাবে থাকবে এবং সবাই দেখতে পারবে।
              </div>

              {/* Purpose */}
              <div className="p-4 bg-light rounded-3 mb-4">
                <h5 className="fw-bold">🤝 আমাদের উদ্দেশ্য</h5>
                <p className="mb-0 text-muted">
                  আমরা একটি সহজ ও নিরাপদ প্রপার্টি প্ল্যাটফর্ম তৈরি করতে চাই।
                  Upgrade চার্জ শুধুমাত্র এই সেবা পরিচালনার জন্য ব্যবহৃত হয়।
                </p>
              </div>

              {/* CTA */}
              <div className="text-center mt-5">
                <h5 className="fw-bold mb-3">
                  ⚡ ছোট একটি আপডেট, বড় একটি সুযোগ
                </h5>
                <p className="text-muted">
                  আপনার পোস্টকে আরও দৃশ্যমান করতে Upgrade Plan ব্যবহার করুন
                </p>

                <p className="mt-3 text-muted small">
                  ✔ ফ্রি ব্যবহার চালিয়ে যেতে পারেন <br />
                  ✔ অথবা Upgrade করে এগিয়ে থাকুন
                </p>
              </div>

              <div className="text-center mt-4 text-muted small">
                – Team Thikana
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyUpgradePlan;