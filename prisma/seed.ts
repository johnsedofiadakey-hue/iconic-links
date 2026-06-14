const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

async function main() {
  console.log('Clearing existing data...');
  await prisma.materialConsumption.deleteMany();
  await prisma.proof.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.service.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  console.log('Seeding data...');

  // 1. Categories & Services
  const catPrinting = await prisma.category.create({
    data: {
      name: 'Printing & Photocopy',
      slug: 'printing-photocopy',
      icon: 'Printer',
      services: {
        create: [
          { name: 'A4 Black & White', slug: 'a4-bw', description: 'Standard A4 printing', basePrice: 0.5, pricingType: 'INSTANT' },
          { name: 'A4 Color', slug: 'a4-color', description: 'Color A4 printing', basePrice: 1.5, pricingType: 'INSTANT' },
          { name: 'Passport Photos', slug: 'passport-photos', description: 'Set of 8 passport photos', basePrice: 15, pricingType: 'INSTANT' }
        ]
      }
    }
  });

  const catBranding = await prisma.category.create({
    data: {
      name: 'Branding & Signage',
      slug: 'branding-signage',
      icon: 'Briefcase',
      services: {
        create: [
          { name: 'Roll-up Banner', slug: 'rollup-banner', description: 'Standard 85x200cm', basePrice: 350, pricingType: 'QUOTE_REQUIRED' },
          { name: 'Business Cards', slug: 'business-cards', description: 'Pack of 100', basePrice: 80, pricingType: 'INSTANT' },
          { name: 'Vehicle Branding', slug: 'vehicle-branding', description: 'Custom vehicle wrap', basePrice: 0, pricingType: 'QUOTE_REQUIRED' }
        ]
      }
    }
  });

  // 2. Organizations
  const orgAcme = await prisma.organization.create({ data: { name: 'Acme Corp' } });
  const orgTech = await prisma.organization.create({ data: { name: 'Tech Solutions' } });

  // 3. Users
  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@iconlinks.com', phone: '0000000000', role: 'SUPER_ADMIN' }
  });
  
  const worker1 = await prisma.user.create({
    data: { name: 'John Worker', email: 'john@iconlinks.com', phone: '1111111111', role: 'PRODUCTION_WORKER' }
  });

  const driver1 = await prisma.user.create({
    data: { name: 'Dave Driver', email: 'dave@iconlinks.com', phone: '2222222222', role: 'DELIVERY_DRIVER' }
  });

  const customer1 = await prisma.user.create({
    data: { name: 'Alice Smith', email: 'alice@example.com', phone: '3333333333', role: 'CUSTOMER', organizationId: orgAcme.id }
  });

  const customer2 = await prisma.user.create({
    data: { name: 'Bob Jones', email: 'bob@example.com', phone: '4444444444', role: 'CUSTOMER' } // Walk-in
  });

  // 4. Inventory
  const invPaper = await prisma.inventoryItem.create({
    data: { name: 'A4 Paper (80gsm)', sku: 'PAPER-A4-80', quantity: 5000, unit: 'sheets', threshold: 500 }
  });
  
  const invVinyl = await prisma.inventoryItem.create({
    data: { name: 'Banner Vinyl', sku: 'VINYL-01', quantity: 100, unit: 'sqm', threshold: 20 }
  });

  // 5. Orders & Consumptions (Mocking past 30 days)
  console.log('Generating historical orders...');
  const services = await prisma.service.findMany();
  
  for (let i = 0; i < 30; i++) {
    // Random date in the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(9 + Math.floor(Math.random() * 8)); // Between 9 AM and 5 PM

    const user = Math.random() > 0.5 ? customer1 : customer2;
    const service = services[Math.floor(Math.random() * services.length)];
    const qty = Math.floor(Math.random() * 5) + 1;
    const price = service.basePrice * qty;

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'COMPLETED',
        totalAmount: price,
        paymentStatus: 'PAID',
        createdAt: date,
        items: {
          create: [{
            serviceId: service.id,
            quantity: qty,
            price: price,
            specs: { notes: 'Seeded order' }
          }]
        }
      }
    });

    // Mock material consumption for COMPLETED orders
    if (service.slug === 'a4-bw' || service.slug === 'a4-color') {
      await prisma.materialConsumption.create({
        data: {
          orderId: order.id,
          workerId: worker1.id,
          inventoryItemId: invPaper.id,
          quantityUsed: qty,
          wastage: Math.random() > 0.8 ? 1 : 0 // Occasional waste
        }
      });
    } else if (service.slug === 'rollup-banner') {
      await prisma.materialConsumption.create({
        data: {
          orderId: order.id,
          workerId: worker1.id,
          inventoryItemId: invVinyl.id,
          quantityUsed: 2 * qty,
          wastage: Math.random() > 0.6 ? 0.5 : 0 // High waste for banners
        }
      });
    }
  }

  // Pending Order for QC Dashboard
  await prisma.order.create({
    data: {
      userId: customer1.id,
      status: 'FINISHING',
      totalAmount: 150,
      paymentStatus: 'PAID',
      items: {
        create: [{
          serviceId: services[0].id,
          quantity: 10,
          price: 150,
          specs: { notes: 'Needs trimming' }
        }]
      }
    }
  });

  // Delivery
  const deliveryOrder = await prisma.order.create({
    data: {
      userId: customer2.id,
      status: 'OUT_FOR_DELIVERY',
      totalAmount: 50,
      paymentStatus: 'PAID',
      items: {
        create: [{
          serviceId: services[1].id,
          quantity: 1,
          price: 50,
          specs: {}
        }]
      }
    }
  });

  await prisma.delivery.create({
    data: {
      orderId: deliveryOrder.id,
      driverId: driver1.id,
      address: '123 Fake Street, Accra',
      status: 'DISPATCHED'
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
