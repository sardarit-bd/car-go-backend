import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import path from "path";
import cookieParser from "cookie-parser";
import errorHandler from "./shared/errors/errorHandler";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";
import packageRoutes from "./modules/packages/package.routes";
import addonRoutes from "./modules/addons/addon.routes";
import locationRoutes from "./modules/locations/location.routes";
import reservationRoutes from "./modules/reservations/reservation.routes";
import authRoutes from "./modules/auth/auth.routes";
import reviewRoutes from "./modules/reviews/review.routes";
import BlogRoutes from "./modules/blogs/blog.routes";
import contactRoutes from "./modules/contacts/contact.routes";
import cmsFaqRoutes from "./modules/cms/cmsFaq/cmsFaq.routes";
import cmsPageRoutes from "./modules/cms/cmsPage/cmsPage.routes";
import cmsContactRoutes from "./modules/cms/cmsContact/cmsContact.routes";
import cmsSocialMediaRoutes from "./modules/cms/cmsSocialMedia/cmsSocialMedia.routes";
import cmsHeroRoutes from "./modules/cms/cmsHero/cmsHero.routes";
import cmsHeroFeatureRoutes from "./modules/cms/cmsHeroFeature/cmsHeroFeature.routes";
import cmsWhyChooseUsRoutes from "./modules/cms/cmsWhyChooseUs/cmsWhyChooseUs.routes";
import cmsWhyChooseUsFeatureRoutes from "./modules/cms/cmsWhyChooseUsFeature/cmsWhyChooseUsFeature.routes";
const app = express();
app.use(rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
}));
app.use(xss());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.0.105:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(helmet({
    crossOriginEmbedderPolicy: false, // Disable COEP
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow cross-origin resources
}));
app.use("/api/reservations/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10kb" }));
const uploadsPath = path.join(process.cwd(), "uploads");
console.log(" Serving static images from:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));
app.get("/", (req, res) => {
    res.send("right endpoint");
});
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/addons", addonRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", BlogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin/cms/faq", cmsFaqRoutes);
app.use("/api/admin/cms/page", cmsPageRoutes);
app.use("/api/admin/cms/contact", cmsContactRoutes);
app.use("/api/admin/cms/social-media", cmsSocialMediaRoutes);
app.use("/api/admin/cms/hero", cmsHeroRoutes);
app.use("/api/admin/cms/hero-feature", cmsHeroFeatureRoutes);
app.use("/api/admin/cms/why-choose-us", cmsWhyChooseUsRoutes);
app.use("/api/admin/cms/why-choose-us-feature", cmsWhyChooseUsFeatureRoutes);
app.use(errorHandler);
export default app;
