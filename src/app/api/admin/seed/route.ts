import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
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
        imageUrl: 'printing-photocopy',
        services: {
          create: [
            { name: 'A4 Black & White', description: 'Standard A4 printing', basePrice: 0.5, pricingType: 'INSTANT' },
            { name: 'A4 Color', description: 'Color A4 printing', basePrice: 1.5, pricingType: 'INSTANT' },
            { name: 'Passport Photos', description: 'Set of 8 passport photos', basePrice: 15, pricingType: 'INSTANT' }
          ]
        }
      }
    });

    const catBranding = await prisma.category.create({
      data: {
        name: 'Branding & Signage',
        imageUrl: 'branding-signage',
        services: {
          create: [
            { name: 'Roll-up Banner', description: 'Standard 85x200cm', basePrice: 350, pricingType: 'QUOTE_REQUIRED' },
            { name: 'Business Cards', description: 'Pack of 100', basePrice: 80, pricingType: 'INSTANT' },
            { name: 'Vehicle Branding', description: 'Custom vehicle wrap', basePrice: 0, pricingType: 'QUOTE_REQUIRED' }
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
      data: { name: 'A4 Paper (80gsm)', unitType: 'sheets', quantity: 5000 }
    });
    
    const invVinyl = await prisma.inventoryItem.create({
      data: { name: 'Banner Vinyl', unitType: 'sqm', quantity: 100 }
    });

    // 5. Orders & Consumptions (Mocking past 30 days)
    console.log('Generating historical orders...');
    const services = await prisma.service.findMany();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      date.setHours(9 + Math.floor(Math.random() * 8));

      const user = Math.random() > 0.5 ? customer1 : customer2;
      const service = services[Math.floor(Math.random() * services.length)];
      const qty = Math.floor(Math.random() * 5) + 1;
      const price = (service.basePrice || 10) * qty;

      const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);

      const order = await prisma.order.create({
        data: {
          orderNumber,
          userId: user.id,
          status: 'COMPLETED',
          totalAmount: price,
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
      if (service.name.includes('A4')) {
        await prisma.materialConsumption.create({
          data: {
            orderId: order.id,
            workerId: worker1.id,
            inventoryItemId: invPaper.id,
            quantityUsed: qty,
            wastage: Math.random() > 0.8 ? 1 : 0
          }
        });
      } else if (service.name.includes('Banner')) {
        await prisma.materialConsumption.create({
          data: {
            orderId: order.id,
            workerId: worker1.id,
            inventoryItemId: invVinyl.id,
            quantityUsed: 2 * qty,
            wastage: Math.random() > 0.6 ? 0.5 : 0
          }
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Seeded successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
