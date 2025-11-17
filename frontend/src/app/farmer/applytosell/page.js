"use client";

import React, { useMemo, useState } from "react";

const INITIAL_FORM = {
  fullName: "",
  farmName: "",
  email: "",
  phone: "",
  location: "",
  productCategories: [],
  certifications: "",
  farmingPractices: "",
  weeklyCapacity: "",
  story: "",
  additionalInfo: "",
  website: "",
  agreeToTerms: false,
};

const CATEGORY_OPTIONS = [
  "Fresh Produce",
  "Dairy",
  "Meat & Poultry",
  "Eggs",
  "Grains & Legumes",
  "Herbs & Spices",
  "Flowers",
  "Value-Added Goods",
];

const APPLY_ENDPOINT = "/api/farmers/apply-to-sell";

const SellApplicationPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submissionError, setSubmissionError] = useState("");

  const isSubmitting = status === "submitting";

  const selectedCategoriesLabel = useMemo(() => {
    if (!form.productCategories.length) {
      return "Select categories";
    }

    if (form.productCategories.length === CATEGORY_OPTIONS.length) {
      return "All categories selected";
    }

    return `${form.productCategories.length} categories selected`;
  }, [form.productCategories]);

  const handleInputChange = (key) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setForm((prev) => {
      const isSelected = prev.productCategories.includes(category);
      return {
        ...prev,
        productCategories: isSelected
          ? prev.productCategories.filter((item) => item !== category)
          : [...prev.productCategories, category],
      };
    });
  };

  const validateForm = (values) => {
    const nextErrors = {};

    if (!values.fullName?.trim()) nextErrors.fullName = "Full name is required.";
    if (!values.farmName?.trim()) nextErrors.farmName = "Farm name is required.";

    if (!values.email?.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!values.phone?.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!values.location?.trim())
      nextErrors.location = "Location is required.";

    if (!values.productCategories.length) {
      nextErrors.productCategories = "Select at least one category.";
    }

    if (!values.weeklyCapacity?.trim()) {
      nextErrors.weeklyCapacity = "Let us know your weekly supply.";
    }

    if (!values.story?.trim()) {
      nextErrors.story = "Share a short story about your farm.";
    }

    if (!values.agreeToTerms) {
      nextErrors.agreeToTerms = "You must agree before submitting.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError("");
    setStatus("submitting");

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || "Unable to submit application.");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setSubmissionError(error.message || "Unexpected error");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Farmer Marketplace
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Apply to Sell With Us
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Share your farm&apos;s story, products, and capacity to join our
            community of trusted growers. We review each application to ensure
            the highest quality for our marketplace.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Farmer Application
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Provide as much detail as possible so our team can review your
              products quickly.
            </p>
          </div>

          <form className="space-y-8 p-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6 md:grid-cols-2">
              <TextField
                id="fullName"
                label="Full name"
                placeholder="Your name"
                value={form.fullName}
                error={errors.fullName}
                onChange={handleInputChange("fullName")}
              />

              <TextField
                id="farmName"
                label="Farm name"
                placeholder="Farm or business name"
                value={form.farmName}
                error={errors.farmName}
                onChange={handleInputChange("farmName")}
              />

              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="you@farm.com"
                value={form.email}
                error={errors.email}
                onChange={handleInputChange("email")}
              />

              <TextField
                id="phone"
                label="Phone"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                error={errors.phone}
                onChange={handleInputChange("phone")}
              />

              <TextField
                id="location"
                label="Primary location"
                placeholder="City, State"
                value={form.location}
                error={errors.location}
                onChange={handleInputChange("location")}
              />

              <TextField
                id="weeklyCapacity"
                label="Estimated weekly capacity"
                placeholder="E.g. 150 lbs of mixed greens"
                value={form.weeklyCapacity}
                error={errors.weeklyCapacity}
                onChange={handleInputChange("weeklyCapacity")}
              />
            </div>

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-slate-900">
                Product categories
              </legend>
              <p className="text-sm text-slate-600">
                Select all categories that best describe your regular supply.
              </p>

              <div className="flex flex-wrap gap-3">
                {CATEGORY_OPTIONS.map((category) => {
                  const isActive = form.productCategories.includes(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        isActive
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700 focus-visible:outline-emerald-500"
                          : "border-slate-300 text-slate-600 hover:border-emerald-400 focus-visible:outline-slate-400"
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                      aria-pressed={isActive}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-slate-500">
                {selectedCategoriesLabel}
              </p>
              {errors.productCategories ? (
                <ErrorMessage message={errors.productCategories} />
              ) : null}
            </fieldset>

            <TextAreaField
              id="story"
              label="Tell us about your farm"
              placeholder="Share your growing practices, farm history, and what makes your products special."
              value={form.story}
              error={errors.story}
              onChange={handleInputChange("story")}
            />

            <TextAreaField
              id="farmingPractices"
              label="Farming practices & certifications"
              placeholder="Organic certification, regenerative farming, pasture-raised, etc."
              value={form.farmingPractices}
              error={errors.farmingPractices}
              onChange={handleInputChange("farmingPractices")}
            />

            <TextAreaField
              id="certifications"
              label="Licenses & inspections"
              placeholder="Food safety certifications, inspection dates, or relevant documentation."
              value={form.certifications}
              error={errors.certifications}
              onChange={handleInputChange("certifications")}
            />

            <TextAreaField
              id="additionalInfo"
              label="Additional notes"
              placeholder="Seasonal availability, packaging options, delivery radius, or wholesale pricing."
              value={form.additionalInfo}
              error={errors.additionalInfo}
              onChange={handleInputChange("additionalInfo")}
            />

            <TextField
              id="website"
              label="Website or social media (optional)"
              placeholder="https://instagram.com/yourfarm"
              value={form.website}
              error={errors.website}
              onChange={handleInputChange("website")}
            />

            <label className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={form.agreeToTerms}
                onChange={handleInputChange("agreeToTerms")}
              />
              <span className="text-sm text-slate-600">
                I confirm the information provided is accurate and consent to be
                contacted about selling opportunities.
              </span>
            </label>
            {errors.agreeToTerms ? (
              <ErrorMessage message={errors.agreeToTerms} />
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">
                Expect to hear from our marketplace team within 3-5 business
                days.
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit application"}
              </button>
            </div>

            {status === "success" ? (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thank you! Your application has been received. Our team will be
                in touch soon.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {submissionError}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
};

const TextField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-900">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        error
          ? "border-rose-400 focus-visible:outline-rose-400"
          : "border-slate-300 focus-visible:outline-emerald-500"
      }`}
    />
    {error ? <ErrorMessage message={error} /> : null}
  </div>
);

const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-900">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        error
          ? "border-rose-400 focus-visible:outline-rose-400"
          : "border-slate-300 focus-visible:outline-emerald-500"
      }`}
    />
    {error ? <ErrorMessage message={error} /> : null}
  </div>
);

const ErrorMessage = ({ message }) => (
  <span className="text-xs font-medium text-rose-600">{message}</span>
);

export default SellApplicationPage;

