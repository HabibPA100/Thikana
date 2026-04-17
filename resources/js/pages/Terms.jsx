import React from "react";

const Terms = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">

              {/* Header */}
              <div className="text-center mb-5">
                <h2 className="fw-bold text-primary">
                  📜 Thikana – Terms & Conditions
                </h2>
                <p className="text-muted">
                  প্ল্যাটফর্ম ব্যবহারের আগে শর্তাবলী ভালোভাবে পড়ুন
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">📌 ১. ভূমিকা</h5>
                <p className="mb-0">
                  Thikana একটি অনলাইন প্ল্যাটফর্ম যেখানে ব্যবহারকারীরা প্রপার্টি
                  ভাড়া বা বিক্রির জন্য তথ্য প্রকাশ করতে পারেন। এটি শুধুমাত্র তথ্য
                  বিনিময়ের মাধ্যম।
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">👤 ২. ব্যবহারকারীর দায়িত্ব</h5>
                <ul className="mb-0">
                  <li>সঠিক ও সত্য তথ্য প্রদান করতে হবে</li>
                  <li>ভুয়া বা প্রতারণামূলক তথ্য সম্পূর্ণ নিষিদ্ধ</li>
                  <li>অন্যের অধিকার লঙ্ঘন করা যাবে না</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">💰 ৩. লেনদেন সংক্রান্ত নীতি</h5>
                <ul className="mb-0">
                  <li>Thikana কোন আর্থিক লেনদেন পরিচালনা করে না</li>
                  <li>ব্যবহারকারীরা নিজেরা যোগাযোগ করে লেনদেন করবেন</li>
                  <li>অগ্রিম দেওয়ার আগে যাচাই করা বাধ্যতামূলক</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">⚠️ ৪. দায়বদ্ধতা সীমাবদ্ধতা</h5>
                <ul className="mb-0">
                  <li>প্রতারণা বা ক্ষতির জন্য Thikana দায়ী নয়</li>
                  <li>তথ্যের সত্যতা ব্যবহারকারীর উপর নির্ভরশীল</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🔐 ৫. অ্যাকাউন্ট ব্যবস্থাপনা</h5>
                <ul className="mb-0">
                  <li>প্রয়োজনে অ্যাকাউন্ট স্থগিত বা বাতিল করা হতে পারে</li>
                  <li>নিয়ম ভঙ্গ করলে পূর্ব সতর্কতা ছাড়াই ব্যবস্থা নেওয়া হবে</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">📝 ৬. কনটেন্ট নিয়ন্ত্রণ</h5>
                <ul className="mb-0">
                  <li>প্রয়োজনে পোস্ট মুছে ফেলার অধিকার রয়েছে</li>
                  <li>অনৈতিক বা অবৈধ কনটেন্ট নিষিদ্ধ</li>
                </ul>
              </div>

              {/* Section 7 */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🔄 ৭. শর্তাবলীর পরিবর্তন</h5>
                <ul className="mb-0">
                  <li>যেকোন সময় শর্তাবলী পরিবর্তন করা হতে পারে</li>
                  <li>ব্যবহার চালিয়ে গেলে নতুন শর্ত প্রযোজ্য হবে</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div className="p-4 bg-warning-subtle rounded-3 border border-warning">
                <h5 className="fw-bold mb-2">⚖️ ৮. আইনগত প্রয়োগ</h5>
                <p className="mb-0">
                  এই শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত হবে।
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;