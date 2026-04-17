import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">

          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">

              {/* Header */}
              <div className="text-center mb-5">
                <h2 className="fw-bold text-primary">
                  🔐 Thikana – Privacy Policy
                </h2>
                <p className="text-muted">
                  আপনার তথ্যের নিরাপত্তা আমাদের কাছে গুরুত্বপূর্ণ
                </p>
              </div>

              {/* Section Card */}
              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">📌 ১. তথ্য সংগ্রহ</h5>
                <p>আমরা ব্যবহারকারীর কাছ থেকে নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:</p>
                <ul className="mb-0">
                  <li>নাম</li>
                  <li>মোবাইল নম্বর</li>
                  <li>ইমেইল ঠিকানা</li>
                  <li>পোস্ট সংক্রান্ত তথ্য</li>
                </ul>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🎯 ২. তথ্য ব্যবহারের উদ্দেশ্য</h5>
                <ul className="mb-0">
                  <li>অ্যাকাউন্ট তৈরি ও পরিচালনার জন্য</li>
                  <li>প্রপার্টি পোস্ট প্রকাশের জন্য</li>
                  <li>ব্যবহারকারীদের মধ্যে যোগাযোগ সহজ করার জন্য</li>
                </ul>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🔗 ৩. তথ্য শেয়ারিং</h5>
                <ul className="mb-0">
                  <li>ব্যবহারকারীর তথ্য তৃতীয় পক্ষের সাথে বিক্রি বা শেয়ার করা হয় না</li>
                  <li>আইনগত প্রয়োজনে তথ্য প্রদান করা হতে পারে</li>
                </ul>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🛡️ ৪. নিরাপত্তা</h5>
                <ul className="mb-0">
                  <li>তথ্য সুরক্ষায় সর্বোচ্চ চেষ্টা করা হয়</li>
                  <li>ইন্টারনেটে শতভাগ নিরাপত্তা নিশ্চিত নয়</li>
                </ul>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🍪 ৫. কুকিজ (Cookies)</h5>
                <p className="mb-0">
                  প্ল্যাটফর্মের কার্যকারিতা উন্নত করতে কুকিজ ব্যবহার করা হতে পারে।
                </p>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">👤 ৬. ব্যবহারকারীর অধিকার</h5>
                <p className="mb-0">
                  ব্যবহারকারী চাইলে নিজের তথ্য আপডেট বা মুছে ফেলতে পারেন।
                </p>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🌐 ৭. তৃতীয় পক্ষের লিংক</h5>
                <p className="mb-0">
                  তৃতীয় পক্ষের লিংকের জন্য Thikana দায়ী নয়।
                </p>
              </div>

              <div className="mb-4 p-4 bg-light rounded-3">
                <h5 className="fw-bold mb-3">🔄 ৮. নীতিমালার পরিবর্তন</h5>
                <p className="mb-0">
                  এই প্রাইভেসি পলিসি যেকোন সময় পরিবর্তন করা হতে পারে।
                </p>
              </div>

              <div className="p-4 bg-warning-subtle rounded-3 border border-warning">
                <h5 className="fw-bold mb-2">✅ ৯. সম্মতি</h5>
                <p className="mb-0">
                  প্ল্যাটফর্ম ব্যবহার করার মাধ্যমে আপনি এই নীতিমালা মেনে নিচ্ছেন।
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;