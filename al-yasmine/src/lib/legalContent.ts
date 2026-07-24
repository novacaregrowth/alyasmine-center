import type { Locale } from "@/lib/i18n";

export interface LegalBlock {
  p?: string;
  ul?: string[];
}

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalPolicy {
  title: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
}

export interface LegalDoc {
  eyebrow: string;
  heading: string;
  intro?: string;
  policies: LegalPolicy[];
  lastUpdated: string;
  back: string;
}

export const privacyContent: Record<Locale, LegalDoc> = {
  en: {
    eyebrow: "Legal",
    heading: "Privacy Policy",
    lastUpdated: "Last updated: July 2026",
    back: "Back to home",
    policies: [
      {
        title: "Privacy Policy",
        intro: [
          {
            p: "Al Yasmine Training & Psychological Counseling Center places great importance on the privacy of its clients and users, and is committed to protecting personal data in accordance with the laws in force in the United Arab Emirates, including the UAE Personal Data Protection Law.",
          },
          {
            p: "By using the website or registering for any of the Center's services, you consent to the collection, use, and processing of your data in accordance with this policy.",
          },
        ],
        sections: [
          {
            heading: "1. Data We Collect",
            blocks: [
              { p: "The Center may collect certain data that the user provides voluntarily, including:" },
              {
                ul: [
                  "Full name",
                  "Phone number",
                  "Email address",
                  "Country or city",
                  "Age or age group when needed",
                  "Booking details",
                  "Payment and invoice details",
                  "Program registration information",
                  "Answers to forms and questionnaires",
                  "Results of psychological or training assessments",
                  "Notes related to the service",
                  "Any information the client sends via the website, WhatsApp, email, or electronic forms",
                ],
              },
            ],
          },
          {
            heading: "2. Sensitive Data",
            blocks: [
              { p: "In some counseling, psychological training, or advisory services, the client may share sensitive personal, psychological, family, or health information." },
              { p: "The Center handles this information with a high degree of professional confidentiality, and it is used only for the purpose of providing the service, professional follow-up, or legal compliance when required." },
            ],
          },
          {
            heading: "3. How We Use Data",
            blocks: [
              { p: "The Center uses data for the following purposes:" },
              {
                ul: [
                  "Communicating with the client",
                  "Confirming bookings or registration",
                  "Providing sessions or programs",
                  "Following up on service commitment",
                  "Sending appointments and reminders",
                  "Issuing invoices",
                  "Improving the quality of services",
                  "Preparing internal, non-identifying reports",
                  "Responding to inquiries",
                  "Meeting legal or professional obligations",
                ],
              },
            ],
          },
          {
            heading: "4. Legal Basis for Processing",
            blocks: [
              { p: "The Center relies on one or more of the following bases for processing data:" },
              {
                ul: [
                  "The client's consent.",
                  "Performing a service requested by the client.",
                  "Compliance with legal or regulatory requirements.",
                  "Protecting the vital interests of the client or others in emergency situations.",
                  "The Center's legitimate interest in managing and improving its services, provided this does not harm the client's rights.",
                ],
              },
            ],
          },
          {
            heading: "5. Data Protection",
            blocks: [
              { p: "The Center takes appropriate measures to protect data from unauthorized access, loss, misuse, or unauthorized disclosure." },
              { p: "Nevertheless, the user acknowledges that transmitting data over the internet cannot be guaranteed to be absolutely secure." },
            ],
          },
          {
            heading: "6. Sharing Data With Third Parties",
            blocks: [
              { p: "The Center does not sell, rent, or share personal data for commercial purposes." },
              { p: "Some data may be shared only in the following cases:" },
              {
                ul: [
                  "With the client's consent.",
                  "With service providers necessary to operate the website, payment, or booking.",
                  "When there is an official request from a competent authority.",
                  "When there is a serious or imminent risk to the life, safety, or well-being of the client or others.",
                  "To protect the Center's legal rights.",
                ],
              },
            ],
          },
          {
            heading: "7. Service Providers",
            blocks: [
              { p: "The Center may use external platforms for booking, payment, email, video meetings, or file storage." },
              { p: "The Center is committed, as far as possible, to choosing trusted service providers; however, the use of these platforms may also be subject to their own privacy policies." },
            ],
          },
          {
            heading: "8. Data Retention",
            blocks: [
              { p: "The Center retains personal data for a period appropriate to achieve the purpose for which it was collected, or to fulfill legal, professional, or accounting obligations." },
              { p: "Once the data is no longer needed, it may be deleted, anonymized, or securely archived." },
            ],
          },
          {
            heading: "9. Client Rights",
            blocks: [
              { p: "The client has the right, in accordance with applicable laws, to request:" },
              {
                ul: [
                  "Access to their personal data.",
                  "Correction of inaccurate data.",
                  "Updating of data.",
                  "Deletion of data where legally possible.",
                  "Restriction of data processing.",
                  "Objection to certain types of processing.",
                  "Withdrawal of consent when processing is based on consent.",
                ],
              },
              { p: "The Center may need to verify the identity of the requester before executing any data-related request." },
            ],
          },
          {
            heading: "10. Confidentiality of Counseling Sessions",
            blocks: [
              { p: "Information shared by the client during sessions is treated with professional confidentiality." },
              { p: "It is not disclosed except in cases permitted by law or required by safety rules, such as a serious risk to the client or others, or an official legal request." },
            ],
          },
          {
            heading: "11. Privacy of Group Program Participants",
            blocks: [
              { p: "Participants in group programs are committed to maintaining the confidentiality of what they hear or learn within the group." },
              { p: "It is prohibited to share the stories, names, or experiences of any participant outside the framework of the program." },
            ],
          },
          {
            heading: "12. Cookies",
            blocks: [
              { p: "The website may use cookies to improve the user experience, analyze website usage, and facilitate the functioning of certain features." },
              { p: "The user can adjust browser settings to reject cookies, noting that some website features may not function fully." },
            ],
          },
          {
            heading: "13. Marketing and Communication",
            blocks: [
              { p: "The Center may use contact data to send messages related to services, programs, appointments, or updates." },
              { p: "The user may request to stop marketing messages at any time by contacting the Center." },
            ],
          },
          {
            heading: "14. Children's and Minors' Data",
            blocks: [
              { p: "The Center does not provide its services to minors except with the consent of a guardian." },
              { p: "If it turns out that a minor's data was provided without appropriate consent, the Center has the right to delete it or stop the service." },
            ],
          },
          {
            heading: "15. Data Transfer Outside the Country",
            blocks: [
              { p: "Some data may be processed or stored via technical platforms outside the United Arab Emirates." },
              { p: "In this case, the Center strives, as far as possible, to use service providers that apply appropriate protection standards." },
            ],
          },
          {
            heading: "16. Updating the Privacy Policy",
            blocks: [
              { p: "The Center has the right to update this policy from time to time. The updated version takes effect from the date of its publication on the website." },
            ],
          },
          {
            heading: "17. Contact Regarding Privacy",
            blocks: [
              { p: "For any request or inquiry related to privacy or personal data, please contact the Center's management through the official communication channels published on the website." },
            ],
          },
        ],
      },
    ],
  },
  ar: {
    eyebrow: "الأحكام القانونية",
    heading: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: يوليو 2026",
    back: "العودة إلى الرئيسية",
    policies: [
      {
        title: "سياسة الخصوصية",
        intro: [
          {
            p: "يولي مركز الياسمين للتدريب والاستشارات النفسية أهمية كبيرة لخصوصية العملاء والمستخدمين، ويلتزم بحماية البيانات الشخصية وفق القوانين المعمول بها في دولة الإمارات العربية المتحدة، بما في ذلك قانون حماية البيانات الشخصية الإماراتي.",
          },
          {
            p: "باستخدامك للموقع أو تسجيلك في أي خدمة من خدمات المركز، فإنك توافق على جمع واستخدام ومعالجة بياناتك وفق هذه السياسة.",
          },
        ],
        sections: [
          {
            heading: "1. البيانات التي نجمعها",
            blocks: [
              { p: "قد يجمع المركز بعض البيانات التي يقدمها المستخدم طوعاً، ومنها:" },
              {
                ul: [
                  "الاسم الكامل",
                  "رقم الهاتف",
                  "البريد الإلكتروني",
                  "الدولة أو المدينة",
                  "العمر أو الفئة العمرية عند الحاجة",
                  "بيانات الحجز",
                  "بيانات الدفع والفواتير",
                  "معلومات التسجيل في البرامج",
                  "إجابات النماذج والاستبيانات",
                  "نتائج المقاييس النفسية أو التدريبية",
                  "الملاحظات المتعلقة بالخدمة",
                  "أي معلومات يرسلها العميل عبر الموقع أو الواتساب أو البريد الإلكتروني أو النماذج الإلكترونية",
                ],
              },
            ],
          },
          {
            heading: "2. البيانات الحساسة",
            blocks: [
              { p: "في بعض خدمات الإرشاد والتدريب النفسي أو الاستشارية، قد يشارك العميل معلومات شخصية أو نفسية أو أسرية أو صحية حساسة." },
              { p: "يتعامل المركز مع هذه المعلومات بسرية مهنية عالية، ولا تستخدم إلا لغرض تقديم الخدمة أو المتابعة المهنية أو الالتزام القانوني عند الحاجة." },
            ],
          },
          {
            heading: "3. كيف نستخدم البيانات",
            blocks: [
              { p: "يستخدم المركز البيانات للأغراض التالية:" },
              {
                ul: [
                  "التواصل مع العميل",
                  "تأكيد الحجز أو التسجيل",
                  "تقديم الجلسات أو البرامج",
                  "متابعة الالتزام بالخدمة",
                  "إرسال المواعيد والتذكيرات",
                  "إصدار الفواتير",
                  "تحسين جودة الخدمات",
                  "إعداد تقارير داخلية غير تعريفية",
                  "الرد على الاستفسارات",
                  "الوفاء بالالتزامات القانونية أو المهنية",
                ],
              },
            ],
          },
          {
            heading: "4. الأساس القانوني للمعالجة",
            blocks: [
              { p: "يعتمد المركز في معالجة البيانات على واحد أو أكثر من الأسس التالية:" },
              {
                ul: [
                  "موافقة العميل.",
                  "تنفيذ خدمة طلبها العميل.",
                  "الالتزام بمتطلبات قانونية أو تنظيمية.",
                  "حماية المصالح الحيوية للعميل أو الآخرين في الحالات الطارئة.",
                  "المصلحة المشروعة للمركز في إدارة خدماته وتحسينها، بشرط عدم الإضرار بحقوق العميل.",
                ],
              },
            ],
          },
          {
            heading: "5. حماية البيانات",
            blocks: [
              { p: "يتخذ المركز إجراءات مناسبة لحماية البيانات من الوصول غير المصرح به أو الفقدان أو إساءة الاستخدام أو الإفصاح غير المصرح به." },
              { p: "ومع ذلك، يقر المستخدم بأن نقل البيانات عبر الإنترنت لا يمكن ضمان أمانه بشكل مطلق." },
            ],
          },
          {
            heading: "6. مشاركة البيانات مع الغير",
            blocks: [
              { p: "لا يبيع المركز البيانات الشخصية ولا يؤجرها ولا يشاركها لأغراض تجارية." },
              { p: "قد تتم مشاركة بعض البيانات فقط في الحالات التالية:" },
              {
                ul: [
                  "بموافقة العميل.",
                  "مع مزودي الخدمة الضروريين لتشغيل الموقع أو الدفع أو الحجز.",
                  "عند وجود طلب رسمي من جهة مختصة.",
                  "عند وجود خطر جاد أو وشيك على حياة العميل أو سلامته أو سلامة الآخرين.",
                  "لحماية حقوق المركز القانونية.",
                ],
              },
            ],
          },
          {
            heading: "7. مزودو الخدمات",
            blocks: [
              { p: "قد يستخدم المركز منصات خارجية للحجز أو الدفع أو البريد الإلكتروني أو الاجتماعات المرئية أو حفظ الملفات." },
              { p: "يلتزم المركز قدر الإمكان باختيار مزودي خدمات موثوقين، إلا أن استخدام هذه المنصات قد يخضع أيضاً لسياسات الخصوصية الخاصة بها." },
            ],
          },
          {
            heading: "8. الاحتفاظ بالبيانات",
            blocks: [
              { p: "يحتفظ المركز بالبيانات الشخصية لمدة مناسبة لتحقيق الغرض الذي جمعت من أجله، أو للوفاء بالالتزامات القانونية أو المهنية أو المحاسبية." },
              { p: "بعد انتهاء الحاجة إلى البيانات، قد يتم حذفها أو إخفاء هوية صاحبها أو أرشفتها بطريقة آمنة." },
            ],
          },
          {
            heading: "9. حقوق العميل",
            blocks: [
              { p: "يحق للعميل، وفق القوانين المعمول بها، أن يطلب:" },
              {
                ul: [
                  "الوصول إلى بياناته الشخصية.",
                  "تصحيح البيانات غير الدقيقة.",
                  "تحديث البيانات.",
                  "حذف البيانات متى كان ذلك ممكناً قانونياً.",
                  "تقييد معالجة البيانات.",
                  "الاعتراض على بعض أنواع المعالجة.",
                  "سحب الموافقة عندما تكون المعالجة قائمة على الموافقة.",
                ],
              },
              { p: "قد يحتاج المركز للتحقق من هوية مقدم الطلب قبل تنفيذ أي طلب متعلق بالبيانات." },
            ],
          },
          {
            heading: "10. سرية الجلسات الإرشادية النفسية",
            blocks: [
              { p: "المعلومات التي يشاركها العميل في الجلسات تعامل بسرية مهنية." },
              { p: "لا يتم الإفصاح عنها إلا في الحالات التي يجيزها القانون أو تفرضها قواعد السلامة، مثل وجود خطر جدي على العميل أو الآخرين، أو وجود طلب قانوني رسمي." },
            ],
          },
          {
            heading: "11. خصوصية المشاركين في البرامج الجماعية",
            blocks: [
              { p: "يلتزم المشاركون في البرامج الجماعية بالحفاظ على سرية ما يسمعونه أو يطلعون عليه داخل المجموعة." },
              { p: "يمنع نقل قصص أو أسماء أو تجارب أي مشاركة خارج إطار البرنامج." },
            ],
          },
          {
            heading: "12. ملفات تعريف الارتباط (Cookies)",
            blocks: [
              { p: "قد يستخدم الموقع ملفات تعريف الارتباط لتحسين تجربة المستخدم، وتحليل استخدام الموقع، وتسهيل عمل بعض الخصائص." },
              { p: "يمكن للمستخدم تعديل إعدادات المتصفح لرفض ملفات تعريف الارتباط، مع العلم أن بعض خصائص الموقع قد لا تعمل بشكل كامل." },
            ],
          },
          {
            heading: "13. التسويق والتواصل",
            blocks: [
              { p: "قد يستخدم المركز بيانات التواصل لإرسال رسائل متعلقة بالخدمات أو البرامج أو المواعيد أو التحديثات." },
              { p: "يمكن للمستخدم طلب إيقاف الرسائل التسويقية في أي وقت عبر التواصل مع المركز." },
            ],
          },
          {
            heading: "14. بيانات الأطفال والقصر",
            blocks: [
              { p: "لا يقدم المركز خدماته للقصر إلا بموافقة ولي الأمر." },
              { p: "إذا تبين أن بيانات قاصر تم تقديمها دون موافقة مناسبة، يحق للمركز حذفها أو إيقاف الخدمة." },
            ],
          },
          {
            heading: "15. نقل البيانات خارج الدولة",
            blocks: [
              { p: "قد تتم معالجة أو تخزين بعض البيانات عبر منصات تقنية خارج دولة الإمارات." },
              { p: "في هذه الحالة يحرص المركز قدر الإمكان على استخدام مزودي خدمات يطبقون معايير حماية مناسبة." },
            ],
          },
          {
            heading: "16. تحديث سياسة الخصوصية",
            blocks: [
              { p: "يحق للمركز تحديث هذه السياسة من وقت لآخر. تسري النسخة المحدثة من تاريخ نشرها على الموقع." },
            ],
          },
          {
            heading: "17. التواصل بخصوص الخصوصية",
            blocks: [
              { p: "لأي طلب أو استفسار متعلق بالخصوصية أو البيانات الشخصية، يرجى التواصل مع إدارة المركز عبر وسائل التواصل الرسمية المنشورة على الموقع." },
            ],
          },
        ],
      },
    ],
  },
};
