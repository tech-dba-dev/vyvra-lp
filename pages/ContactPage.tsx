import React, { useState, useRef } from 'react';

// Enquiry types
const ENQUIRY_TYPES = [
  'Order Issue',
  'Delivery Question',
  'Returns & Exchanges',
  'Sizing Support',
  'Membership Support',
  'Product Question',
  'Collaboration Enquiry',
  'Other',
] as const;

const ORDER_REQUIRED_TYPES = ['Order Issue', 'Delivery Question', 'Returns & Exchanges'];
const ADDRESS_VISIBLE_TYPES = ['Delivery Question', 'Order Issue'];

// Colors — matched to vyvra.com Shopify theme
const C = {
  btn: '#CF9C97',        // primary button (same as "Track Your Order")
  btnHover: '#333333',   // button hover
  text: '#6E6E5A',       // body text (sage muted)
  textDark: '#333333',   // input text / headings
  inputBorder: '#DFDFDF',// input border
  inputBg: 'rgba(255,255,255,0.78)',
  error: '#B5413D',
  success: '#5A7D60',
};

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ALLOWED_EXT = '.jpg, .png, .pdf';

type FormData = {
  enquiryType: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Field Error ─── */
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ color: C.error, fontSize: '0.75rem', marginTop: 6 }}>{msg}</p>;
}

/* ─── File Attachment Row ─── */
function FileRow({ file, onRemove }: { key?: React.Key; file: File; onRemove: () => void }) {
  const sizeKB = (file.size / 1024).toFixed(0);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 12px', borderRadius: 4, fontSize: '0.875rem',
      background: '#f5f0ed', color: C.textDark,
    }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
        {file.name} <span style={{ color: C.text, fontSize: '0.75rem' }}>({sizeKB} KB)</span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        style={{ marginLeft: 12, fontSize: '0.75rem', fontWeight: 600, color: C.btn, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        Remove
      </button>
    </div>
  );
}

/* ─── Success View ─── */
function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: '40px 0' }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', fontSize: 24, background: `${C.success}18`, color: C.success,
      }}>
        ✓
      </div>
      <p style={{ fontSize: '1rem', fontWeight: 600, color: C.textDark, marginBottom: 8 }}>
        Request Received
      </p>
      <p style={{ fontSize: '0.875rem', color: C.text, marginBottom: 4 }}>
        Thank you for contacting Vyvra.
      </p>
      <p style={{ fontSize: '0.875rem', color: C.text, marginBottom: 24 }}>
        Our team will respond within <strong style={{ color: C.textDark }}>24–48 hours</strong>.
      </p>
      <p style={{ fontSize: '0.75rem', color: C.text, marginBottom: 24 }}>
        A confirmation email has been sent to your inbox.
      </p>
      <button
        onClick={onReset}
        style={{
          background: C.btn, color: '#fff', border: 'none', borderRadius: 14,
          padding: '14px 28px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = C.btnHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = C.btn; }}
      >
        Submit Another Request
      </button>
    </div>
  );
}

/* ─── Shared Styles ─── */
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.875rem', fontWeight: 400,
  color: C.text, marginBottom: 6,
};

const inputBase: React.CSSProperties = {
  width: '100%', padding: '0.8rem', borderRadius: 4, fontSize: '0.875rem',
  border: `1px solid ${C.inputBorder}`, background: C.inputBg, color: C.textDark,
  outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s',
};

const inputError: React.CSSProperties = { ...inputBase, borderColor: C.error };

/* ─── Contact Form (embed) ─── */
function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormData>({
    enquiryType: '', orderNumber: '', firstName: '', lastName: '',
    email: '', phone: '', address: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const needsOrder = ORDER_REQUIRED_TYPES.includes(form.enquiryType);
  const showAddress = ADDRESS_VISIBLE_TYPES.includes(form.enquiryType);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selected: File[] = e.target.files ? Array.from(e.target.files) : [];
    const remaining = MAX_FILES - files.length;
    if (selected.length > remaining) { setFileError(`You can attach up to ${MAX_FILES} files total.`); return; }
    for (const f of selected) {
      if (!ALLOWED_TYPES.includes(f.type)) { setFileError(`"${f.name}" is not supported. Allowed: ${ALLOWED_EXT}`); return; }
      if (f.size > MAX_FILE_SIZE) { setFileError(`"${f.name}" exceeds the 5 MB limit.`); return; }
    }
    setFiles((prev) => [...prev, ...selected]);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeFile = (idx: number) => { setFiles((prev) => prev.filter((_, i) => i !== idx)); setFileError(''); };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.enquiryType) e.enquiryType = 'Please select an enquiry type.';
    if (needsOrder && !form.orderNumber.trim()) e.orderNumber = 'Order number is required for this enquiry.';
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!validateEmail(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Please describe how we can help.';
    return e;
  };

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setSubmitError('');

    try {
      // Convert files to base64 for the API
      const filePayloads = await Promise.all(
        files.map((f) => new Promise<{ name: string; type: string; data: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({ name: f.name, type: f.type, data: base64 });
          };
          reader.onerror = reject;
          reader.readAsDataURL(f);
        }))
      );

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot, files: filePayloads }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      onSuccess();
    } catch {
      setSubmitError('Unable to send your message. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const getStyle = (field: keyof FormData) => errors[field] ? inputError : inputBase;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <div style={{ position: 'absolute', left: -9999, opacity: 0 }} aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {/* Enquiry Type */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Enquiry Type *</label>
          <select
            value={form.enquiryType}
            onChange={set('enquiryType')}
            style={{
              ...getStyle('enquiryType'),
              appearance: 'none', cursor: 'pointer',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236E6E5A' viewBox='0 0 16 16'%3E%3Cpath d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            <option value="" disabled>Choose an option…</option>
            {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <FieldError msg={errors.enquiryType} />
        </div>

        {/* Order Number (conditional) */}
        {form.enquiryType && (
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Order Number{needsOrder ? ' *' : ''}</label>
            <input type="text" value={form.orderNumber} onChange={set('orderNumber')} placeholder="e.g. VYVRA-001" style={getStyle('orderNumber')} />
            <FieldError msg={errors.orderNumber} />
          </div>
        )}

        {/* Name Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input type="text" value={form.firstName} onChange={set('firstName')} placeholder="First Name" style={getStyle('firstName')} />
            <FieldError msg={errors.firstName} />
          </div>
          <div>
            <label style={labelStyle}>&nbsp;</label>
            <input type="text" value={form.lastName} onChange={set('lastName')} placeholder="Last Name" style={getStyle('lastName')} />
            <FieldError msg={errors.lastName} />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Email *</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="Email" style={getStyle('email')} />
          <FieldError msg={errors.email} />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Phone</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Phone" style={getStyle('phone')} />
        </div>

        {/* Delivery Address (conditional) */}
        {showAddress && (
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Delivery Address</label>
            <input type="text" value={form.address} onChange={set('address')} placeholder="Street, city, postcode, country" style={inputBase} />
          </div>
        )}

        {/* Message */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Comment *</label>
          <textarea
            value={form.message}
            onChange={set('message')}
            placeholder="Please provide as much detail as possible."
            rows={6}
            style={{ ...getStyle('message'), resize: 'vertical' }}
          />
          <FieldError msg={errors.message} />
        </div>

        {/* File Attachments */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Attachments <span style={{ fontWeight: 400, color: '#999' }}>(optional — max 3 files, 5 MB each)</span></label>

          {files.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
              {files.map((f, i) => <FileRow key={`${f.name}-${i}`} file={f} onRemove={() => removeFile(i)} />)}
            </div>
          )}

          {files.length < MAX_FILES && (
            <label style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '12px', borderRadius: 4, fontSize: '0.875rem', cursor: 'pointer',
              border: `1px dashed ${C.inputBorder}`, color: C.text, background: C.inputBg,
              transition: 'opacity 0.2s',
            }}>
              + Choose file
              <input ref={fileRef} type="file" accept={ALLOWED_EXT} multiple onChange={handleFiles} style={{ display: 'none' }} />
            </label>
          )}

          <p style={{ fontSize: '0.75rem', color: '#999', marginTop: 6 }}>Accepted: JPG, PNG, PDF</p>
          {fileError && <FieldError msg={fileError} />}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div style={{
            padding: '12px 16px', marginBottom: 16, borderRadius: 4,
            background: `${C.error}10`, border: `1px solid ${C.error}30`,
            color: C.error, fontSize: '0.875rem',
          }}>
            {submitError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: submitting ? '#999' : C.btn,
            color: '#fff', border: 'none', borderRadius: 14,
            padding: '16px 24px', fontSize: '0.875rem', fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s', width: 'auto',
          }}
          onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.background = C.btnHover; }}
          onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.background = C.btn; }}
        >
          {submitting ? 'Sending…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

/* ─── Main Export ─── */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {submitted
        ? <SuccessView onReset={() => setSubmitted(false)} />
        : <ContactForm onSuccess={() => setSubmitted(true)} />
      }
    </div>
  );
}
