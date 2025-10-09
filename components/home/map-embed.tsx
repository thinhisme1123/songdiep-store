export function MapEmbed() {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.6793720585138!2d106.6479603757025!3d10.681976260927428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317531a2bd3fce5d%3A0x25f4f310f5a73bea!2zUXXDoW4gQ2jDqCBTb25nIMSQaeG7h3A!5e0!3m2!1svi!2s!4v1759939810081!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Quán Chè Song Điệp Location"
      />
    </div>
  )
}
